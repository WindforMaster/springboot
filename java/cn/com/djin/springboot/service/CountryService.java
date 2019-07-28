package cn.com.djin.springboot.service;

import cn.com.djin.springboot.entity.Country;

import java.util.List;

/**
 * 部门业务层接口
 */
public interface CountryService {


    //查询所有部门信息
    List<Country> findAllCountry() throws Exception;

}
