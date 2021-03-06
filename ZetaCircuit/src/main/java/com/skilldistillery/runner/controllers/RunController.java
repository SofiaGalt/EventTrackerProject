package com.skilldistillery.runner.controllers;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
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

@CrossOrigin({ "*", "http://localhost:4300" })
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
	
	@GetMapping("runs/totalMiles")
	public Double allRunsTotalMiles() {
		return runService.getTotalMilesForAllRuns();
	} 
	
	@GetMapping("runs/{id}")
	public Run findById(@PathVariable Integer id) {
		return runService.retrieve(id);
	}
	
	@PutMapping("runs/{id}")
	public Run update(@PathVariable Integer id, @RequestBody Run run, HttpServletResponse resp, HttpServletRequest req) {
		run = runService.update(id, run);
		if(run != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(run.getId());
			resp.setHeader("Location", url.toString());
		}
		else { resp.setStatus(404); }
		return run;
	}
	
	
	@PostMapping("runs")
	public Run create(@RequestBody Run run, HttpServletResponse resp, HttpServletRequest req) {
		
		run = runService.create(run);
		if(run != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(run.getId());
			resp.setHeader("Location", url.toString());
		}
		else { resp.setStatus(404); }
		
		return run;
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
	
	@GetMapping("users/{userId}/runs")
	public List<Run> listRunsForUser(
			@PathVariable Integer userId,
			HttpServletResponse resp
	) {
		List<Run> runs = runService.findAllForUser(userId);
		if (runs == null) {
			resp.setStatus(404);
		}
		return runs;
	}
	
	@GetMapping("users/{userId}/runs/{runId}")
	public Run retrieveRunGivenIdAndUser(
			@PathVariable Integer userId,
			@PathVariable Integer runId,
			HttpServletResponse resp
	) {
		Run run = runService.findByIdAndUser(runId, userId);
		if (run == null) {
			resp.setStatus(404);
		}
		return run;
	}
	
	@PostMapping("users/{userId}/runs")
	public Run addRunForUser(
			@PathVariable Integer userId,
			@RequestBody Run run,
			HttpServletRequest req,
			HttpServletResponse resp
	) {
		System.out.println("****************inside addRunForUser ("+ userId + ")  ");
		run = runService.create(userId, run);
		if (run != null) {
			resp.setStatus(201);
			StringBuffer url = req.getRequestURL();
			url.append("/").append(run.getId());
			resp.setHeader("Location", url.toString());
		}
		else {
			resp.setStatus(404);
		}
		return run;
	}
	
	@DeleteMapping("users/{userId}/runs/{runId}")
	public void deleteRunForUser(@PathVariable Integer userId, @PathVariable Integer runId, HttpServletResponse resp) {
		
		if (runService.delete(userId, runId) != null) {
			resp.setStatus(204);
		}
		else {
			resp.setStatus(404);
		}
	}
}
