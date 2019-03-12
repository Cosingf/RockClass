package com.example.adminmanage.dao;

import com.example.adminmanage.entity.Admin;
import com.example.adminmanage.entity.Student;
import com.example.adminmanage.entity.Teacher;
import com.example.adminmanage.entity.User;
import com.example.adminmanage.mapper.AdminMapper;
import com.example.adminmanage.mapper.StudentMapper;
import com.example.adminmanage.mapper.TeacherMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class AdminDao {

    @Autowired
    private TeacherMapper teacherMapper;

    @Autowired
    private StudentMapper studentMapper;

    @Autowired
    private AdminMapper adminMapper;


    public Admin findByAccount(String account) {
        return adminMapper.selectByAccount(account);
    }

    public List<Student> getStudentList() {
        return studentMapper.selectAll();
    }

    public Student findStudentByAccount(String account) {
        return studentMapper.selectByAccount(account);
    }

    public List<Student> findStudentsByName(String name) {
        return studentMapper.selectByName(name);
    }

    public Student modifyStudentInformation(Long studentId, String account, String name, String email) {
        Student student=studentMapper.selectById(studentId);
        student.setAccount(account);
        student.setStudentName(name);
        student.setEmail(email);
        studentMapper.updateById(student);
        return student;
    }

    public Student modifyStudentPassword(Long studentId, String password) {
        Student student=studentMapper.selectById(studentId);
        student.setPassword(password);
        studentMapper.updateById(student);
        return student;
    }

    public int deleteStudent(Long studentId) {
        return studentMapper.deleteById(studentId);
    }

    public List<Teacher> getTeacherList() {
        return teacherMapper.selectAll();
    }

    public Teacher createTeacher(Teacher teacher) {
        teacherMapper.insert(teacher);
        return teacher;
    }

    public Teacher findTeacherByAccount(String account) {
        return teacherMapper.selectByAccount(account);
    }

    public List<Teacher> findTeacherByName(String name) {
        return teacherMapper.selectByName(name);
    }

    public Teacher modifyTeacherInformation(Long teacherId, String account, String name, String email) {
        Teacher teacher=teacherMapper.selectById(teacherId);
        teacher.setAccount(account);
        teacher.setTeacherName(name);
        teacher.setEmail(email);
        teacherMapper.updateById(teacher);
        return teacher;
    }

    public Teacher modifyTeacherPassword(Long teacherId, String password) {
        Teacher teacher=teacherMapper.selectById(teacherId);
        teacher.setPassword(password);
        teacherMapper.updateById(teacher);
        return teacher;
    }

    public int deleteTeacher(Long teacherId) {
        return teacherMapper.deleteById(teacherId);
    }

    public Student findStudentById(Long studentId) {
        return studentMapper.selectById(studentId);
    }

    public Teacher findTeacherById(Long teacherId) {
        return teacherMapper.selectById(teacherId);
    }
}
