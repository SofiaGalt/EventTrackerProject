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
	
//	List<Run> retrieveAllRunsForUser Average Pace(int userId);
//	List<Run> retrieveAllRunsForUser Average Distance(int userId);
//	List<Run> retrieveAllRunsForUser total miles run(int userId);
//	List<Run> retrieveAllRunsForUserRaceTitleNotNull(int userId);
}
