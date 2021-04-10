package com.skilldistillery.runner.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.runner.entities.User;
import com.skilldistillery.runner.services.UserService;

@RequestMapping("api")
@RestController
public class UserController {

	@Autowired
	private UserService userService;
	
	@GetMapping("users/{id}")
	public User retrieve(@PathVariable Integer id, HttpServletResponse resp, HttpServletRequest req) {
		
		User u = userService.retrieve(id);
		if(u == null) {
			resp.setStatus(404);
		}
		return u;
	}
}
