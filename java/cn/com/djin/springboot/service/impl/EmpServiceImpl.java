package cn.com.djin.springboot.service.impl;

import cn.com.djin.springboot.entity.Emp;
import cn.com.djin.springboot.mapper.EmpMapper;
import cn.com.djin.springboot.service.EmpService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 *   员工业务层实现类
 */
@Service
@Transactional(readOnly = false)
public class EmpServiceImpl implements EmpService {

    //依赖注入员工Mapper代理对象
    @Autowired
    private EmpMapper empMapper;

    //查询所有员工
    @Override
    public List<Emp> findAllEmp() throws Exception {
        return empMapper.selectAllEmp();
    }

    //分页查询员工数据
    @Override
    public Map<String, Object> findPageEmpByPramas(Integer page, Integer limit, Emp emp) throws Exception {
        Map<String,Object> map=new HashMap<String,Object>();



        map.put("count",empMapper.getEmpCountByPramas(emp));
        map.put("data",empMapper.selectEmpByPramas(emp,(page-1)*limit,limit));
        return map;
    }

    //根据id删除员工数据
    @Override
    public String removerEmpById(Integer id) throws Exception {
        if (empMapper.delEmpById(id)>0){
           return "success";
        }else {
            return "fail";
        }

    }



    /**
     * 修改员工数据
     * @param emp
     * @return
     * @throws Exception
     */
    @Override
    public String updEmp(Emp emp) throws Exception {
        if (empMapper.updEmp(emp)>0){
            return "success";
        }else {
            return "fail";
        }
    }


    //新增员工数据
    @Override
    public String saveEmp(Emp emp) throws Exception {
        if (empMapper.insEmp(emp)>0){
            return "success";
        }else {
            return "fail";
        }
    }


    //批量删除员工数据
    @Override
    public String removeBatchEmpByIds(Integer[] empids) throws Exception {
        if (empMapper.delBatchEmpByIds(empids)>0){
            return "success";
        }else {
            return "fail";
        }
    }
}
