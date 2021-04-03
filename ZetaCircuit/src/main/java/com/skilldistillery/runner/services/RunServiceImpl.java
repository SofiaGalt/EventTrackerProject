package com.skilldistillery.runner.services;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.skilldistillery.runner.entities.Run;
import com.skilldistillery.runner.entities.User;
import com.skilldistillery.runner.repositories.RunRepository;

@Service
@Transactional
public class RunServiceImpl implements RunService {
	
	@Autowired
	private RunRepository runRepo;
	
	@PersistenceContext
	EntityManager em;

	@Override
	public List<Run> findAll() {
		
		return runRepo.findByEnabled(true);
	}

	@Override
	public Run create(Run run) {
		
		User user = run.getUser();
		run.setUser(em.find(User.class, user.getId()));
		
		return runRepo.saveAndFlush(run);
	}

	@Override
	public Run retrieve(int runId) {
		
		return runRepo.findByIdAndEnabled(runId, true);
	}

	@Override
	public Run update(int id, Run run) {
		
		Run originalRun = retrieve(id);
		
		if(originalRun == null) return null;
		
		if(run.getDistance() != null) originalRun.setDistance(run.getDistance());
		if(run.getDistanceUnit() != null) originalRun.setDistanceUnit(run.getDistanceUnit());
		if(run.getLocation() != null) originalRun.setLocation(run.getLocation());
		if(run.getHours() != null) originalRun.setHours(run.getHours());
		if(run.getMinutes() != null) originalRun.setMinutes(run.getMinutes());
		if(run.getSeconds() != null) originalRun.setSeconds(run.getSeconds());
		if(run.getNotes() != null) originalRun.setNotes(run.getNotes());
		if(run.getRaceTitle() != null) originalRun.setRaceTitle(run.getRaceTitle());
		
		return runRepo.saveAndFlush(originalRun);
	}

	@Override
	public Run delete(int id) {
		
		System.out.println("inside RunServiceImpl delete ******************************************************************");
		Run toDelete = retrieve(id);
		
		if(toDelete == null) return null;
		
		toDelete.setEnabled(false);
		
		runRepo.saveAndFlush(toDelete);
		return toDelete;
	}

}
