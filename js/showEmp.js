layui.use(['table','layer','jquery','laydate'], function(){
    //jquery 事件放在前面   ,自定义的方法放后面  方便以后查找,规范代码

    //开发中主键定义成varchar类型  主键新增的时候需要处理
    var table = layui.table;//获得table模块 ,引用table表格模块
    /* layer 模块和jquery 模块默认引用  */
    $ = layui.jquery,
    layer.msg("使用了layui的前端框架"),
         form=layui.form,
        layer=layui.layer,
        laydate= layui.laydate;//引用日期插件模块

    var selJsonEmp={}; //查询条件

    var currentPage=1; //表格操作的当前页
    loadEmpByPramas(selJsonEmp);
    loadAllCountry();

    //使用日期插件
    laydate.render({
        elem: '#birth', // 加入容器的id       或 elem: document.getElementById('test')、elem: lay('#test') 等

        format:'yyyy/MM/dd HH:mm:ss',
        type:'datetime'
    });
    laydate.render({
        elem: '#hiredate', // 加入容器的id       或 elem: document.getElementById('test')、elem: lay('#test') 等
        format:'yyyy/MM/dd HH:mm:ss',
        type:'datetime'
    });

    /* return {   res响应回页面的数据  服务器端Map集合
           "code": res.status, //解析接口状态   必须要有响应回的状态：0或者200
           "msg": res  .message, //解析提示文本    可以不用
           "count": res.total, //解析数据长度    必须要有响应回的数据条数
           "data": res.data.item //解析数据列表   必须要有响应回的数据集合
       };*/


function loadEmpByPramas(selJsonEmp){
    console.log(selJsonEmp);
    //第一个实例
    table.render({  //表格的方法级渲染
        elem: '#demo'//为数据显示的容器
        ,height: 312  //容器的高度
        ,limit:5
        ,limits:[2,5,8,10,15,20]
        ,where:selJsonEmp
        //width: 150 //指定容器的宽度
        //where:{"age":"38"}//往服务器端传递额外的请求参数
        ,url: 'emp/loadPageEmpByPramas' //数据接口
        ,page: true //开启分页
        ,even:true //隔层变色,渐变
        ,cols: [[ //表头   表示每一列的数据
            {type:'checkbox'}
            ,{field: 'id', title: 'ID', width:80, sort: true,align:'center'}
            ,{field: 'name', title: '用户名', width:80, align:'center'}
            ,{field: 'age', title: '年龄', width:80, sort: true,align:'center'}
            ,{field: 'sex', title: '性别', width:80,align:'center'}
            ,{field: 'salary', title: '工资', width: 177,align:'center'}
            ,{field: 'bonus', title: '津贴', width: 80, sort: true,align:'center'}
            ,{field: 'birth', title: '出生日期', width: 80, sort: true,align:'center'}
            ,{field: 'hiredate', title: '入职日期', width: 80,align:'center'} // d.country.dname中d表示当前操作的对象  country表示当前对象中的属性
            ,{field: 'dname', title: '部门名称', width: 150, sort: true,align:'center',templet:'<div>{{d.country.dname}}</div>>' }
            ,{field: 'loc', title: '部门地址', width: 150, sort: true,align:'center',templet:'<div>{{d.country.loc}}</div>>'}

            ,{ title:'操作', toolbar: '#barDemo', width:210 ,align:'center'}
        ]],
        done:function (res,curr,count) { //表格加载时的函数回调
           currentPage=curr; //把数据表格操作的当前页赋值给全局变量
        }
    });

}

    //查询的表单的监听
    form.on('submit(demo2)', function(data){
        selJsonEmp = data.field //当前容器的全部表单字段，名值对形式：{name: value}
        if (data.field.leader!=''){//判断不为空
            var arrCountry=data.field.leader.split(",");
            delete selJsonEmp['leader']  //20 魏国  北京
            selJsonEmp['leader']=arrCountry[0]; //20
        }
        loadEmpByPramas(selJsonEmp);
        return false; //阻止表单跳转。如果需要表单跳转，去掉这段即可。
    });



//监听工具条
    table.on('tool(test)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
        var data = obj.data; //获得当前行数据
        var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
       // var tr = obj.tr; //获得当前行 tr 的DOM对象



        if(layEvent === 'del'){ //                删除
            layer.confirm('真的删除行么', function(index){


                //向服务端发送删除指令
                delEmpById(data.id,obj);
                layer.close(index);//关闭当前弹窗
            });
        } else if(layEvent === 'edit'){ //        修改
            //1.do something 执行数据的回显
            //formTest 即 class="layui-form" 所在元素对应的 lay-filter="" 对应的值
            form.val("formTest", {
                "id":data.id
                ,"name": data.name // "name": "value"
                ,"age": data.age
                ,"sex": data.sex
                ,"salary": data.salary
                ,"bonus": data.bonus
                ,"birth": data.birth
                ,"hiredate": data.hiredate

            })
            //2. 弹框
            layer.open({//弹窗

                type:1,  //弹出方式
                title:"员工数据修改界面",//界面标题
                area:['400px','600px'],//弹框的宽高度
                anim:4, //动画效果
                shade:0.6 , //遮罩
                content:$("#updOrSaveEmpDiv")//弹框内容
            })
            //3. 执行服务器端的修改
            form.on('submit(demo1)',function (dataDemo01) {

                var updJsonEmp=dataDemo01.field;
                console.log(updJsonEmp);
                updEmp(updJsonEmp,obj); //执行服务器端的数据修改
                layer.closeAll();  //关闭所有弹窗
                return false;
            });

        }
    });


    //添加新增员工
    $("#saveUIBtn").click(function () {
        //1.情况表单
        $("form").eq(0).find("input").val("");//清空表单中input标签的value值

        // 2. 弹框
        layer.open({//弹窗

            type:1,  //弹出方式
            title:"员工数据添加界面",//界面标题
            area:['400px','600px'],//弹框的宽高度
            anim:4, //动画效果
            shade:0.6 , //遮罩
            content:$("#updOrSaveEmpDiv")//弹框内容
        })
        //3. 执行服务器端的修改
        form.on('submit(demo1)',function (dataDemo01) {

            var saveJsonEmp=dataDemo01.field;
            console.log(saveJsonEmp);

            //处理部门数据内容    20  魏国   北京   ,只要20
            var arrCountry =saveJsonEmp.leader.split(',');
            delete saveJsonEmp['leader'];
            delete saveJsonEmp['id'];
            saveJsonEmp['leader']=arrCountry[0]

            console.log(saveJsonEmp)

            saveEmp(saveJsonEmp); //执行服务器端的数据添加  ,新增需要刷新界面所以不需要obj去修改页面
            layer.closeAll();  //关闭所有弹窗
            return false;
        });
    });


    //批量删除
    $("#delBatchBtn").click(function () {
        layer.confirm('真的删除行么', function(index){
             //关闭弹窗的两个方法  一个是close()加上index 就是关闭当前  另一个是关闭closeAll()

            var data = table.checkStatus('demo').data; //idTest 即为基础参数 id 对应的值
            if (data.length!=0){ //有选中 执行删除
                var empids="";
                for (var i=0;i<data.length;i++){
                    empids+=data[i].id+",";
                }
               empids= empids.substring(0,empids.length-1);
                console.log(empids)
                //数据获取后进行批量删除操作
                delBatchEmpByIds(empids);
            }else {//没有选中任何数据
                layer.msg("您还未选择要删除的数据 !",{icon:3,time:2000,anim:4,shade:0.6})
            }

            console.log(data) //获取选中行的数据
            console.log(data.length) //获取选中行数量，可作为是否有选中行的条件
           // console.log(isAll ) //表格是否全选


            layer.close(index);//关闭当前弹窗
        });
    });


    //刷新
    $("#flushTableBtn").click(function () {
        //1. 第一种表格刷新方法   刷新当前页
        /*table.reload('demo', {
            url: 'emp/loadPageEmpByPramas'
            ,where: selJsonEmp //设定异步数据接口的额外参数
            //,height: 300
        });*/

        //2. 第二种表格刷新方法  刷新指定页面  非常灵活 可以自定义方法指定
        /*table.reload('demo', {
            where: selJsonEmp
            ,page: {
                curr: 1 //重新从第 1 页开始
            }
        }); //只重载数据*/
        flushTable(currentPage)
    });



  //加载所有部门信息
    function loadAllCountry() {
          $.ajax({
                url:"country/loadAllCountry",
                type:"post",
                dataType:"JSON",

                success:function (rs) {
                    console.log(rs)
                    var  selCountryStr ='<option value="">全部</option>'
                  $.each(rs,function (i,country) {
                      selCountryStr+='<option value="'+country.leader+','+country.dname+','+country.loc+'">'+country.dname+'</option>';
                  });
                  $("#selCountryId").html(selCountryStr);
                  $("#updDeptId").html(selCountryStr);
                  //下拉框的渲染  原来的下拉框和layui的下拉框需要进行渲染转换
                    form.render('select');//刷新select选择框渲染
                },
                error:function (rs) {

                    layer.msg("服务器异常")
                }
            });

    }




    //根据id删除员工
    function  delEmpById(id,obj) {
        $.ajax({
            url:"emp/delEmpById",
            type:"post",
            data:{
                "id":id
            },

            success:function (rs) {
               if (rs=='success'){//ajax成功执行返回正确结果
                   obj.del(); //删除对应行（tr）的DOM结构，并更新缓存(页面缓存)
                 layer.msg("删除成功!",{icon:1,time:2000,anim:4,shade:0.6})
               }else {
                   layer.msg("删除失败!",{icon:2,time:2000,anim:4,shade:0.6})
               }
            },
            error:function (rs) {

                layer.msg("服务器异常 ! !",{icon:3,time:2000,anim:4,shade:0.6})
            }
        });
    }


    //修改员工数据
    function updEmp(updJsonEmp,obj) {
        var arrCountry =updJsonEmp.leader.split(',');
        delete updJsonEmp['leader'];
        updJsonEmp['leader']=arrCountry[0];
          $.ajax({
                url:"emp/updEmp ",
                type:"POST",
                dataType:"text",
                data:updJsonEmp,
                success:function(rs) {

                    console.log("执行ajax成功")
                    if (rs=='success'){//ajax成功执行返回正确结果
                        //同步更新缓存对应的值
                        obj.update({
                            id:updJsonEmp.id
                            ,name: updJsonEmp.name // "name": "value"
                            ,age: updJsonEmp.age
                            ,sex: updJsonEmp.sex
                            ,salary: updJsonEmp.salary
                            ,bonus: updJsonEmp.bonus
                            ,birth: updJsonEmp.birth
                            ,hiredate: updJsonEmp.hiredate
                        });
                        obj.tr.children().eq(9).find("div").text(arrCountry[1]);
                        obj.tr.children().eq(10).find("div").text(arrCountry[2]);


                        //或者修改成功后重新加载页面 loadEmpByPramas(selJsonEmp)但是这种操作会重新查询数据库影响性能
                        layer.msg("修改成功!",{icon:1,time:2000,anim:4,shade:0.6})
                    }else {
                        layer.msg("修改 失败!",{icon:2,time:2000,anim:4,shade:0.6})
                    }

                },
                error:function(rs) {
                    layer.msg("修改员工数据服务器异常 ! !",{icon:3,time:2000,anim:4,shade:0.6})
                }
                });
    }



    //添加员工
    function saveEmp(saveJsonEmp) {
        $.ajax({
            url:"emp/saveEmp ",
            type:"POST",
            dataType:"text",
            data:saveJsonEmp,
            //async:false,
            success:function(rs) {

                console.log("执行ajax成功")
                if (rs=='success'){//ajax成功执行返回正确结果

                    flushTable(1); //刷新表格数据
                    //或者修改成功后重新加载页面 loadEmpByPramas(selJsonEmp)但是这种操作会重新查询数据库影响性能
                    layer.msg("添加成功!",{icon:1,time:2000,anim:4,shade:0.6})
                }else {
                    layer.msg("添加失败!",{icon:2,time:2000,anim:4,shade:0.6})
                }

            },
            error:function(rs) {
                layer.msg("添加员工数据服务器异常 ! !",{icon:3,time:2000,anim:4,shade:0.6})
            }
        });
    }


    //批量删除
    function delBatchEmpByIds(empids) {
        $.ajax({
            url:"emp/delBatchEmpByIds",
            type:"POST",
            dataType:"text",
            data:{"empids":empids},
            success:function(rs) {

                console.log("执行ajax成功")
                if (rs=='success'){//ajax成功执行返回正确结果

                    loadEmpByPramas(selJsonEmp); //刷新表格数据
                    //或者修改成功后重新加载页面 loadEmpByPramas(selJsonEmp)但是这种操作会重新查询数据库影响性能
                    layer.msg("批量删除成功!",{icon:1,time:2000,anim:4,shade:0.6})
                }else {
                    layer.msg("批量删除失败!",{icon:2,time:2000,anim:4,shade:0.6})
                }

            },
            error:function(rs) {
                layer.msg("批量删除服务器异常 ! !",{icon:3,time:2000,anim:4,shade:0.6})
            }
        });
    }



    //刷新表格
    function flushTable(currentPage) {
        table.reload('demo', {
            where: selJsonEmp
            ,page: {
                curr: currentPage //重新从第 几(当前页)页开始
            }
        });
    }
});