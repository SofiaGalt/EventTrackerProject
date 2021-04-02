package com.skilldistillery.runner.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.skilldistillery.runner.entities.Run;
import com.skilldistillery.runner.services.RunService;

@RequestMapping("api")
@RestController
public class RunController {
	
	@Autowired
	private RunService runService;
	
	@GetMapping("ping")
	public String ping() {
		return "pong";
	}
	
	@GetMapping("runs")
	public List<Run> allRuns() {
		return runService.allRuns();
	}
}
