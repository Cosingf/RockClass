package com.example.adminmanage.service;

import com.example.adminmanage.dao.AdminDao;
import com.example.adminmanage.entity.Student;
import com.example.adminmanage.entity.Teacher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    @Autowired
    private AdminDao adminDao;

    public List<Student> getStudentList() {
        return adminDao.getStudentList();
    }



    public Student findStudentByAccount(String account) {
        return adminDao.findStudentByAccount(account);
    }

    public List<Student> findStudentsByName(String name) {
        return adminDao.findStudentsByName(name);
    }

    public Student modifyStudentInformation(Long studentId, String account, String name, String email) {
        return adminDao.modifyStudentInformation(studentId,account,name,email);
    }

    public Student modifyStudentPassword(Long studentId, String password) {
        return adminDao.modifyStudentPassword(studentId,password);
    }

    public int deleteStudent(Long studentId) {
        return adminDao.deleteStudent(studentId);
    }

    public List<Teacher> getTeacherList() {
        return adminDao.getTeacherList();
    }

    public Teacher createTeacher(Teacher teacher) {
        return adminDao.createTeacher(teacher);
    }

    public Teacher findTeacherByAccount(String account) {
        return adminDao.findTeacherByAccount(account);
    }

    public List<Teacher> findTeacherByName(String name) {
        return adminDao.findTeacherByName(name);
    }

    public Teacher modifyTeacherInformation(Long teacherId, String account, String name, String email) {
        return adminDao.modifyTeacherInformation(teacherId,account,name,email);
    }

    public Teacher modifyTeacherPassword(Long teacherId, String password) {
        return adminDao.modifyTeacherPassword(teacherId,password);
    }

    public int deleteTeacher(Long teacherId) {
        return adminDao.deleteTeacher(teacherId);
    }

    public Student findStudentById(Long studentId) {
        return adminDao.findStudentById(studentId);
    }

    public Teacher findTeacherById(Long teacherId) {
        return adminDao.findTeacherById(teacherId);
    }
}
