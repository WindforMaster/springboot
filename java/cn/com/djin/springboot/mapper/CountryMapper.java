package cn.com.djin.springboot.mapper;

import cn.com.djin.springboot.entity.Country;

import java.util.List;

/**
 * 部门mapper对象
 */
public interface CountryMapper {

    //根据部门id查询部门信息

    Country selectCountryById(Integer did) throws Exception;


   //查询所有部门数据
    List<Country> selectAllCountry() throws Exception;
}
