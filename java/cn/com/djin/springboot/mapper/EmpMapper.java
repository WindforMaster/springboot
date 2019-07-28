package cn.com.djin.springboot.mapper;

import cn.com.djin.springboot.entity.Emp;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 *   员工Mapper代理对象
 */
public interface EmpMapper {

    //查询所有
    List<Emp> selectAllEmp() throws Exception;

    //根据条件查询
    List<Emp> selectEmpByPramas(@Param("emp") Emp emp, @Param("currentRecord") Integer currentRecord, @Param("limit") Integer limit)throws Exception;

   //根据条件查询数据条数
    Integer getEmpCountByPramas(@Param("emp") Emp emp);


    //根据id删除员工数据
    Integer delEmpById(Integer id)throws Exception;


    //修改员工数据
    Integer updEmp(Emp emp) throws Exception;

    //添加员工数据
    Integer insEmp(Emp emp) throws Exception;


    //批量删除员工数据
    Integer delBatchEmpByIds(Integer[] empids) throws Exception;
}
