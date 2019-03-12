package com.example.adminmanage.mapper;

import com.example.adminmanage.entity.Teacher;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface TeacherMapper {

    int deleteById(Long id);

    int insert(Teacher teacher);

    Teacher selectByAccount(String account);

    List<Teacher> selectAll();

    void updateById(Teacher teacher);

    List<Teacher> selectByName(String name);

    Teacher selectById(Long id);

}
