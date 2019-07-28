package cn.com.djin.springboot.service.impl;

import cn.com.djin.springboot.entity.Country;
import cn.com.djin.springboot.mapper.CountryMapper;
import cn.com.djin.springboot.service.CountryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * 部门业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class CountryServiceImpl implements CountryService {

    //依赖部门的mapper代理对象
    @Autowired
    private CountryMapper countryMapper;


    @Override
    public List<Country> findAllCountry() throws Exception {

        return countryMapper.selectAllCountry();
    }
}
