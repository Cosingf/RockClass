package com.example.adminmanage.controller;


import com.alibaba.fastjson.JSON;
import com.example.adminmanage.entity.Student;
import com.example.adminmanage.entity.Teacher;
import com.example.adminmanage.service.AdminService;
import com.example.adminmanage.vo.UserVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@RestController
public class AdminController {

    @Autowired
    private AdminService adminService;

    //管理员登录
    @PostMapping("/admin/login")
    public void login(HttpServletRequest request, HttpServletResponse response) {

    }

    //获取学生列表
    @GetMapping("/student")
    public void getStudentList(HttpServletResponse response)throws IOException {
        response.setContentType("application/json;charset=utf-8");
        List<Student> students =adminService.getStudentList();
        List<UserVO> userVOList=new ArrayList<UserVO>();
        for(Student student:students){
            UserVO userVO = new UserVO();
            userVO.setId(student.getId());
            userVO.setAccount(student.getAccount());
            userVO.setName(student.getStudentName());
            userVO.setEmail(student.getEmail());
            userVOList.add(userVO);
        }
        response.setStatus(200);
        response.getWriter().print(JSON.toJSONString(userVOList));
    }

    //根据学号或者姓名查找学生
    @GetMapping("/student/searchstudent")
    public void searchStudent(HttpServletRequest request,HttpServletResponse response)throws Exception{
        response.setContentType("application/json;charset=utf-8");
        String content = request.getParameter("content");
        Pattern p = Pattern.compile("[\u4e00-\u9fa5]");
        Matcher m = p.matcher(content);

        if(!m.find()){
            Student student = adminService.findStudentByAccount(content);
            if (student!=null) {
                UserVO userVO=new UserVO();
                userVO.setId(student.getId());
                userVO.setAccount(student.getAccount());
                userVO.setName(student.getStudentName());
                userVO.setEmail(student.getEmail());
                response.setStatus(200);
                response.getWriter().print(JSON.toJSONString(userVO));
                return;
            }
        }
        else{
            List<Student> students = adminService.findStudentsByName(content);
            if (students!=null) {
                List<UserVO> userVOList=new ArrayList<UserVO>();
                for(Student student:students){
                    UserVO userVO = new UserVO();
                    userVO.setId(student.getId());
                    userVO.setAccount(student.getAccount());
                    userVO.setName(student.getStudentName());
                    userVO.setEmail(student.getEmail());
                    userVOList.add(userVO);
                }
                response.setStatus(200);
                response.getWriter().print(JSON.toJSONString(userVOList));
                return;
            }
        }

        response.setStatus(404);
        throw new  Exception("找不到相应的学生");

    }

    //修改某一学生信息（学号，姓名，email）
    @PutMapping("/student/{studentId}/information")
    public void modifyStudentInformation(@PathVariable("studentId")Long studentId,HttpServletRequest request,HttpServletResponse response)throws Exception{
        response.setContentType("application/json;charset=utf-8");
        if(adminService.findStudentById(studentId)!=null){
            Student student = adminService.modifyStudentInformation(studentId,request.getParameter("account"),request.getParameter("name"),request.getParameter("email"));
            UserVO userVO=new UserVO();
            userVO.setId(student.getId());
            userVO.setAccount(student.getAccount());
            userVO.setName(student.getStudentName());
            userVO.setEmail(student.getEmail());
            response.setStatus(200);
            response.getWriter().print(JSON.toJSONString(userVO));
        }
        else {
            response.setStatus(404);
            throw new Exception("未找到该学生");
        }
    }

    //修改学生密码
    @PutMapping("/student/{studentId}/password")
    public void modifyStudentPassword(@PathVariable("studentId")Long studentId,HttpServletRequest request,HttpServletResponse response)throws Exception{
        response.setContentType("application/json;charset=utf-8");
        //Student student = adminService.modifyStudentPassword(studentId,request.getParameter("password"));
        if(adminService.findStudentById(studentId)!=null){
            Student student = adminService.modifyStudentPassword(studentId,"123456");
            UserVO userVO=new UserVO();
            userVO.setId(student.getId());
            userVO.setAccount(student.getAccount());
            userVO.setName(student.getStudentName());
            userVO.setEmail(student.getEmail());
            response.setStatus(200);
            response.getWriter().print(JSON.toJSONString(userVO));
        }
        else {
            response.setStatus(404);
            throw new Exception("未找到该学生");
        }
    }

    //删除学生账号
    @DeleteMapping("/student/{studentId}")
    public void deleteStudent(@PathVariable("studentId")Long studentId,HttpServletResponse response)throws Exception{
        if(adminService.findStudentById(studentId)!=null){
            adminService.deleteStudent(studentId);
            response.setStatus(200);
        }else {
            response.setStatus(404);
            throw new Exception("未找到该学生");
        }
    }

    //获取教师列表
    @GetMapping("/teacher")
    public void getTeacherList(HttpServletResponse response)throws IOException {
        response.setContentType("application/json;charset=utf-8");
        List<Teacher> teachers =adminService.getTeacherList();
        List<UserVO> userVOList=new ArrayList<UserVO>();
        for(Teacher teacher:teachers){
            UserVO userVO = new UserVO();
            userVO.setId(teacher.getId());
            userVO.setAccount(teacher.getAccount());
            userVO.setName(teacher.getTeacherName());
            userVO.setEmail(teacher.getEmail());
            userVOList.add(userVO);
        }
        response.setStatus(200);
        response.getWriter().print(JSON.toJSONString(userVOList));
    }

    //创建教师账号
    @PostMapping("/teacher")
    public void createTeacher(HttpServletRequest request, HttpServletResponse response)throws Exception {
        response.setContentType("application/json;charset=utf-8");
        //账号不存在才能创建账号
        //&&adminService.findStudentByEmail(request.getParameter("email"))==null)
        if(adminService.findTeacherByAccount(request.getParameter("account"))==null){
            Teacher teacher =new Teacher();
            teacher.setAccount(request.getParameter("account"));
            teacher.setPassword(request.getParameter("password"));
            teacher.setTeacherName(request.getParameter("name"));
            teacher.setIsActive((byte)0);
            teacher.setEmail(request.getParameter("email"));
            Teacher teacher1=adminService.createTeacher(teacher);
            response.setStatus(200);
            response.getWriter().print(JSON.toJSONString(teacher1));
        }else {
            response.setStatus(400);
            throw new Exception("错误的account/email参数 ");
        }
    }

    //根据教工号或者姓名查找教师
    @GetMapping("/teacher/searchteacher")
    public void searchTeacher(HttpServletRequest request,HttpServletResponse response)throws Exception{
        response.setContentType("application/json;charset=utf-8");
        String content = request.getParameter("content");

        Pattern p = Pattern.compile("[\u4e00-\u9fa5]");
        Matcher m = p.matcher(content);

        if(!m.find()){
            Teacher teacher = adminService.findTeacherByAccount(content);
            if(teacher!=null){
                UserVO userVO = new UserVO();
                userVO.setId(teacher.getId());
                userVO.setAccount(teacher.getAccount());
                userVO.setName(teacher.getTeacherName());
                userVO.setEmail(teacher.getEmail());
                response.setStatus(200);

                response.getWriter().print(JSON.toJSONString(userVO));
                return;
            }
        }
        else {
            List<Teacher> teachers = adminService.findTeacherByName(content);
            if(teachers!=null){
                List<UserVO> userVOList=new ArrayList<UserVO>();
                for(Teacher teacher:teachers){
                    UserVO userVO = new UserVO();
                    userVO.setId(teacher.getId());
                    userVO.setAccount(teacher.getAccount());
                    userVO.setName(teacher.getTeacherName());
                    userVO.setEmail(teacher.getEmail());
                    userVOList.add(userVO);
                }
                response.setStatus(200);
                response.getWriter().write(JSON.toJSONString(userVOList));
                return;
            }
        }
        response.setStatus(404);
        throw new  Exception("找不到相应的教师");
    }

    //修改某一教师信息（教工号，姓名，email）
    @PutMapping("/teacher/{teacherId}/information")
    public void modifyTeacherInformation(@PathVariable("teacherId")Long teacherId,HttpServletRequest request,HttpServletResponse response)throws Exception{
        response.setContentType("application/json;charset=utf-8");
        if(adminService.findTeacherById(teacherId)!=null){
            Teacher teacher = adminService.modifyTeacherInformation(teacherId,request.getParameter("account"),request.getParameter("name"),request.getParameter("email"));
            UserVO userVO = new UserVO();
            userVO.setId(teacher.getId());
            userVO.setAccount(teacher.getAccount());
            userVO.setName(teacher.getTeacherName());
            userVO.setEmail(teacher.getEmail());
            response.setStatus(200);
            response.getWriter().print(JSON.toJSONString(userVO));
        }
        else {
            response.setStatus(404);
            throw new Exception("未找到该教师");
        }
    }

    //修改教师密码
    @PutMapping("/teacher/{teacherId}/password")
    public void modifyTeacherPassword(@PathVariable("teacherId")Long teacherId,HttpServletRequest request,HttpServletResponse response)throws Exception{
        response.setContentType("application/json;charset=utf-8");
        ///Teacher teacher = adminService.modifyTeacherPassword(teacherId,request.getParameter("password"));
        if(adminService.findTeacherById(teacherId)!=null){
            Teacher teacher = adminService.modifyTeacherPassword(teacherId,"123456");
            UserVO userVO = new UserVO();
            userVO.setId(teacher.getId());
            userVO.setAccount(teacher.getAccount());
            userVO.setName(teacher.getTeacherName());
            userVO.setEmail(teacher.getEmail());
            response.setStatus(200);
            response.getWriter().print(JSON.toJSONString(userVO));
        }
        else {
            response.setStatus(404);
            throw new Exception("未找到该教师");
        }
    }

    //删除教师账号
    @DeleteMapping("/teacher/{teacherId}")
    public void deleteTeacher(@PathVariable("teacherId")Long teacherId,HttpServletResponse response)throws Exception{
        if(adminService.findTeacherById(teacherId)!=null){
            adminService.deleteTeacher(teacherId);
            response.setStatus(200);
        }else {
            response.setStatus(404);
            throw new Exception("未找到该教师");
        }
    }

}
