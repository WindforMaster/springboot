package cn.com.djin.springboot.controller;

import cn.com.djin.springboot.entity.Emp;
import cn.com.djin.springboot.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.HashMap;
import java.util.Map;

/**
 *   页面跳转的控制器
 */
@Controller
@RequestMapping("/emp")
public class EmpController {

    @Autowired
    private EmpService empService;

    @RequestMapping("/toShowEmp")
    public
    String toShow(Model model){

        return "showEmp";
    }


    //根据条件分页查询员工数据
    @RequestMapping("/loadPageEmpByPramas")
    public @ResponseBody
    Map<String,Object> loadPageEmpByPramas(Integer page, Integer limit, Emp emp){
       /* System.out.println("page:"+page); //当前页
        System.out.println("limit:"+limit);//分页参数*/

       Map<String,Object> map=new HashMap<String, Object>();
        try {
            System.out.println("进入正常状态码0");
            map= empService.findPageEmpByPramas(page,limit,emp);
            System.out.println(map);
            map.put("code",0);
        } catch (Exception e) {
            System.out.println("进入错误状态码200");
            e.printStackTrace();
            map.put("code",200);
        }
        System.out.println("这里是controller层返回数据前的最后一个地方 "+map);
        return map;
    }


    //根据id删除员工数据
    @RequestMapping("/delEmpById")
    public @ResponseBody
    String delEmpById(Integer id){

        try {
            return empService.removerEmpById(id);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }


    //修改员工数据
    @RequestMapping("/updEmp")
    public @ResponseBody String updEmp(Emp emp){
        try {

            return empService.updEmp(emp);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }



    //添加员工
    @RequestMapping("/saveEmp")
    public @ResponseBody String saveEmp(Emp emp){
        try {
            return empService.saveEmp(emp);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }



    //批量删除员工数据
    @RequestMapping("/delBatchEmpByIds")
    public @ResponseBody String delBatchEmpByIds(Integer[] empids){

        try {
            return empService.removeBatchEmpByIds(empids);
        } catch (Exception e) {
            e.printStackTrace();
            return "error";
        }
    }
}
