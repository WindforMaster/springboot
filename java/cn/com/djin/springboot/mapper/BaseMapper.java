package cn.com.djin.springboot.mapper;

import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 基础的Mapper代理对象
 * @param <T>  实体对象的泛型 (实体对象泛指的类 型)
 */
public interface BaseMapper<T> {
    //查询所有
    List<T> selectAllT() throws Exception;

    //根据条件查询
    List<T> selectTByPramas(@Param("t") T t, @Param("currentRecord") Integer currentRecord, @Param("limit") Integer limit)throws Exception;

    //根据条件查询数据条数
    Integer getTCountByPramas(@Param("t") T t);


    //根据id删除员工数据
    Integer delTById(Integer id)throws Exception;


    //修改员工数据
    Integer updT(T t) throws Exception;

    //添加员工数据
    Integer insT(T t) throws Exception;


    //批量删除员工数据
    Integer delBatchTByIds(Integer[] Ids) throws Exception;



    //根据部门id查询部门信息

    T selectTById(Integer Id) throws Exception;


    //查询所有部门数据
    //List<Country> selectAllCountry() throws Exception;
}
