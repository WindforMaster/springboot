package cn.com.djin.springboot.service;

import cn.com.djin.springboot.entity.Emp;

import java.util.List;
import java.util.Map;

/**
 *   员工业务层接口
 */
public interface EmpService {

    //查询所有员工
    List<Emp> findAllEmp() throws Exception;

    /**
     *
     * @param page
     * @param limit
     * @param emp
     * @return
     * @throws Exception
     */
    //分页查询员工数据
    Map<String,Object> findPageEmpByPramas(Integer page, Integer limit, Emp emp)throws Exception;


    //根据id删除员工数据
    String removerEmpById(Integer id)throws Exception;


    //修改员工数据
    String updEmp(Emp emp)throws Exception;

    //添加员工数据
    String saveEmp(Emp emp)throws Exception;


    //批量删除员工数据
    String removeBatchEmpByIds(Integer[] empids)throws Exception;
}
