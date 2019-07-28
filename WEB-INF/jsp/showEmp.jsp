<%@ page language="java" contentType="text/html; charset=UTF-8"
         pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jstl/core" prefix="c" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort() + path + "/";
%>
<head>
    <base href="<%=basePath%>"/>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title></title>
    <!--引入layui的样式文件-->
    <link rel="stylesheet" href="lib/layui/css/layui.css">
    <!--引入layui的js文件-->
    <script src="lib/layui/layui.js"></script>
</head>
<body>


<!--修改的员工页面表单-->
<div style="display: none;margin-top: 30px;" id="updOrSaveEmpDiv">
    <form class="layui-form" action="" lay-filter="formTest">
        <input type="hidden" name="id"/>
        <div class="layui-form-item">
            <label class="layui-form-label">姓名</label>
            <div class="layui-input-inline">
                <input type="text" name="name" lay-verify="required" placeholder="请输入姓名" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">年龄</label>
            <div class="layui-input-inline">
                <input type="text" name="age" lay-verify="required|number" placeholder="请输入年龄" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">性别</label>
            <div class="layui-input-inline">
                <input type="text" name="sex" lay-verify="required" placeholder="请输入性别" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">工资</label>
            <div class="layui-input-inline">
                <input type="text" name="salary" lay-verify="required|number" placeholder="请输入工资" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">津贴</label>
            <div class="layui-input-inline">
                <input type="text" name="bonus" lay-verify="required|number" placeholder="请输入津贴" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">出生日期</label>
            <div class="layui-input-inline">
                <input type="text" id="birth" name="birth" lay-verify="required" placeholder="请选则出生日期" autocomplete="off" class="layui-input">
            </div>
        </div>
        <div class="layui-form-item">
            <label class="layui-form-label">入职时间</label>
            <div class="layui-input-inline">
                <input type="text" id="hiredate" name="hiredate" lay-verify="required" placeholder="请选则入职时间" autocomplete="off" class="layui-input">
            </div>
        </div>

        <div class="layui-form-item">
            <label class="layui-form-label">部门</label>
            <div class="layui-input-inline">
                <select name="leader" lay-verify="required" id="updDeptId"></select>
            </div>
        </div>
        <div class="layui-form-item">
            <div class="layui-input-block">
                <button class="layui-btn"  lay-submit=""  lay-filter="demo1">立即提交</button>
                <button type="reset" class="layui-btn layui-btn-primary">重置</button>
            </div>
        </div>
    </form>

</div>



<h1 align="center">员工数据显示页面</h1>
<div align="center" style="margin-top: 20px;">
    <button type="button" class="layui-btn layui-btn-radius" id="flushTableBtn"><i class="layui-icon">&#xe654;</i> 刷新</button>
    <button type="button" class="layui-btn layui-btn-normal" id="saveUIBtn"><i class="layui-icon">&#xe654;</i> 新增</button>
    <button type="button" class="layui-btn layui-btn-danger" id="delBatchBtn"><i class="layui-icon">&#xe640;</i> 批量删除</button>
    <p style="display: inline-block;margin-top:10px;margin-left: 20px;">
    <form class="layui-form layui-form-pane" action="" style="display: inline-block;">
        <div class="layui-form-item" style="display: inline-block;">
            <div class="layui-inline" style="margin-top: 8px;">
                <label class="layui-form-label">部门：</label>
                <div class="layui-input-block">
                    <select name="leader" id="selCountryId">
                       <%-- <option value="">全部</option>
                        <option value="10">教研部</option>
                        <option value="20">学工部</option>
                        <option value="30">销售部</option>
                        <option value="40">财务部</option>--%>
                    </select>
                </div>
            </div>
            <div class="layui-inline" style="margin-top: 8px;">
                <label class="layui-form-label">员工姓名：</label>
                <div class="layui-input-inline">
                    <input type="text" name="name" autocomplete="off" class="layui-input" placeholder="请输入员工姓名">
                </div>
            </div>
        </div>
        <div class="layui-form-item" style="display: inline-block;">
            <button class="layui-btn" lay-submit="" lay-filter="demo2"><i class="layui-icon">&#xe615;</i>查询</button>
        </div>
    </form>
    </p>
    <table id="demo" lay-filter="test"></table>
</div>



</body>
<script type="text/html" id="barDemo">
    <a class="layui-btn layui-btn-xs" lay-event="edit"><i class="layui-icon">&#xe642;</i>修改</a>
    <a class="layui-btn layui-btn-danger layui-btn-xs" lay-event="del"><i class="layui-icon">&#xe640;</i>删除</a>
</script>
<script src="js/showEmp.js"></script>
</html>