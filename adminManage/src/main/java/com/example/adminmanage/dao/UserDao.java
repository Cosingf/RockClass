package com.example.adminmanage.dao;

import com.example.adminmanage.entity.Admin;
import com.example.adminmanage.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class UserDao {

    @Autowired
    private AdminDao adminDao;

    public User findByAccount(String account){
        Admin admin = adminDao.findByAccount(account);
        return new User(admin.getId(),admin.getAccount(),admin.getPassword(),"admin");
    }
}
