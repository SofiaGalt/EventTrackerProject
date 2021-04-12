package com.skilldistillery.runner.controllers;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.runner.entities.Run;
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
	
	@GetMapping("users/{userId}/totalMiles")
	public Double retrieveTotalMilesRun(@PathVariable Integer userId, HttpServletResponse resp, HttpServletRequest req) {
		
		Double t = userService.retrieveTotalMilesForUser(userId);
		if(t == null) {
			resp.setStatus(404);
		}
		return t;
	}
	
	
	
	
	@PutMapping("users/{id}")
	public User update(@PathVariable Integer id, @RequestBody User user, HttpServletResponse resp, HttpServletRequest req) {
		user = userService.update(id, user);
		if(user != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(user.getId());
			resp.setHeader("Location", url.toString());
		}
		else { resp.setStatus(404); }
		return user;
	}
	
	
	@PostMapping("users")
	public User create(@RequestBody User user, HttpServletResponse resp, HttpServletRequest req) {
		
		user.setPassword("next");
		user = userService.create(user);
		if(user != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(user.getId());
			resp.setHeader("Location", url.toString());
		}
		else { resp.setStatus(404); }
		
		return user;
	}
	
	@DeleteMapping("users/{id}")
	public String delete(@PathVariable Integer id, HttpServletResponse resp) {
		
		User r = userService.delete(id);
		
		if(r != null) {
			resp.setStatus(204);
			return "Deletion was successful.";
		}
		else {
			resp.setStatus(404);
			return "Deletion was unsuccessful.";
		}
	}
}
