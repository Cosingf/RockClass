package com.example.adminmanage.mapper;

import com.example.adminmanage.entity.Student;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface StudentMapper {

    int deleteById(Long id);

    void updateById(Student student);

    Student selectByAccount(String account);

    List<Student> selectByName(String name);

    Student selectById(Long id);

    List<Student> selectAll();
}
