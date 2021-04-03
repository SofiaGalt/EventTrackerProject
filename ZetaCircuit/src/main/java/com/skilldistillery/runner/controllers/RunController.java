package com.skilldistillery.runner.controllers;

import java.util.List;

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
		return runService.findAll();
	}
	
	@GetMapping("runs/{id}")
	public Run findById(@PathVariable Integer id) {
		return runService.retrieve(id);
	}
	
	@PutMapping("runs/{id}")
	public Run update(@PathVariable Integer id, @RequestBody Run run) {
		return runService.update(id, run);
	}
	
	@PostMapping("runs")
	public Run create(@RequestBody Run run) {
		
		return runService.create(run);
	}
	
	@DeleteMapping("runs/{id}")
	public String delete(@PathVariable Integer id, HttpServletResponse resp) {
		
		Run r = runService.delete(id);
		
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
