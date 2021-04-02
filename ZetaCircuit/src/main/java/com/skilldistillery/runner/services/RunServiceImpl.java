package com.skilldistillery.runner.services;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.runner.entities.Run;
import com.skilldistillery.runner.repositories.RunRepository;

@Service
@Transactional
public class RunServiceImpl implements RunService {
	
	@Autowired
	private RunRepository runRepo;
	
	@Override
	public List<Run> allRuns() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Run retrieveRun(int runId) {
		// TODO Auto-generated method stub
		return null;
	}

}
