package com.example.adminmanage.mapper;

import com.example.adminmanage.entity.Admin;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AdminMapper {

    Admin selectByAccount(String account);
}
