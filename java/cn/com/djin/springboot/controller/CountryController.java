package cn.com.djin.springboot.controller;

import cn.com.djin.springboot.entity.Country;
import cn.com.djin.springboot.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 部门控制器
 */

@Controller
@RequestMapping("/country")
public class CountryController {


    //依赖部门业务层对象
    @Autowired
    private CountryService countryService;



    //加载所有部门信息
    @RequestMapping("/loadAllCountry")
    public @ResponseBody
    List<Country> loadAllCountry(){

        try {
            return countryService.findAllCountry();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }




}
