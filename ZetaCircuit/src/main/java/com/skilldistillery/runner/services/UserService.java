package com.skilldistillery.runner.services;

import java.util.List;

import com.skilldistillery.runner.entities.User;

public interface UserService {

	List<User> findAll();  
	User create(User user);
	User retrieve(int userId);
	User update(int id, User user);
	User delete(int userId);
}