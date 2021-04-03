package com.skilldistillery.runner.services;

import java.util.List;

import com.skilldistillery.runner.entities.Run;

public interface RunService {
	
	List<Run> findAll();  
	Run create(Run run);
	Run retrieve(int runId);
//	List<Run> retrieveAllRunsForUser(int userId);
	Run update(int id, Run run);
	Run delete(int id);
}
