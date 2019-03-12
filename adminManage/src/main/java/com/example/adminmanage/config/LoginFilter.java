package com.example.adminmanage.config;

import com.alibaba.fastjson.JSON;
import com.example.adminmanage.entity.User;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;


import javax.servlet.FilterChain;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;


public class LoginFilter extends AbstractAuthenticationProcessingFilter {

    @Autowired
    private JwtService jwtService;

    public LoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }


    /**
     * @param request
     * @param response
     * @throws AuthenticationException
     * @return
     */
    @Override
    public Authentication attemptAuthentication(HttpServletRequest request,
                                                HttpServletResponse response) throws AuthenticationException  {
        /*//对登录请求进行拦截。即 POST /login
        if (!request.getMethod().equals("POST")) {
            throw new AuthenticationServiceException(
                    "Authentication method not supported: " + request.getMethod());
        }*/
        User user = new User(request.getParameter("account"),request.getParameter("password"));
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(user.getAccount(), user.getPassword())
        );

    }

    /**
     * 登录成功， 返回 jwt 等信息
     *
     * @param request
     * @param response
     * @param chain
     * @param authResult
     * @throws IOException
     */
    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult) throws IOException {
        UsernamePasswordAuthenticationToken auth = (UsernamePasswordAuthenticationToken) authResult;
        try {
            Object obj = auth.getPrincipal();
            if(obj != null) {
                User user = (User)obj;
                String jwtString = jwtService.generateJwt(user);

                Map map = new HashMap();
                map.put("id",user.getId());
                map.put("jwt",jwtString);

                //response.setContentType("application/json;charset=utf-8");
                response.setStatus(200);
                response.getWriter().write(JSON.toJSONString(map));
            }

        }catch (AuthenticationException e){
            e.printStackTrace();
        }

    }

    /**
     * 登录失败 返回 400 状态码
     *
     * @param request
     * @param response
     * @param failed
     * @throws IOException

     */
    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException {
        response.setContentType("application/json");
        response.setStatus(400);
        response.getWriter().write("账号/密码错误");
    }

}
