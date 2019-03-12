package com.example.adminmanage.config;

import com.example.adminmanage.dao.AdminDao;
import com.example.adminmanage.dao.UserDao;
import com.example.adminmanage.entity.User;

import com.example.adminmanage.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


@Service
@Qualifier("customUserDetailsService")
public class UserDetailsService {

    @Autowired
    private UserDao userDao;

    /**
     * 获取用户信息
     *
     * @param account
     * @return
     * @throws UsernameNotFoundException
     */
    public User loadUserByUsername(String account) throws UsernameNotFoundException{
        return userDao.findByAccount(account);
    }
}
