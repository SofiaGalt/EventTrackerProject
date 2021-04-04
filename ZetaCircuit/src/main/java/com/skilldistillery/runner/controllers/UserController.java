package com.skilldistillery.runner.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.runner.services.RunService;

@RequestMapping("api")
@RestController
public class UserController {

	@Autowired
	private RunService runService;
}
