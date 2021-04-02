package com.skilldistillery.runner.services;

import java.util.List;

import com.skilldistillery.runner.entities.Run;

public interface RunService {
	
	List<Run> allRuns();
	Run retrieveRun(int runId);
	
}
