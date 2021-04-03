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
	public List<Run> findAll() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Run create(Run run) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Run retrieve(int runId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public List<Run> retrieveAllRunsForUser(int userId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Run update(Run run) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Run delete(Run run) {
		// TODO Auto-generated method stub
		return null;
	}

}
