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
		if(user != null) {
			run.setUser(em.find(User.class, user.getId()));
		}
		else{
			run.setUser(em.find(User.class, 1));
		}
		
		return runRepo.saveAndFlush(run);
	}
	
	@Override
	public Run create(int userId, Run run) {
		
		User user = em.find(User.class, userId);
		if(user == null) return null;
		if((run.getUser() != null) && (!run.getUser().equals(user))) return null;
		
		run.setUser(user);
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
		
		Run toDelete = retrieve(id);
		
		if(toDelete == null) return null;
		
		toDelete.setEnabled(false);
		
		runRepo.saveAndFlush(toDelete);
		return toDelete;
	}
	
	@Override
	public Run delete(int userId, int runId) {
		
		Run toDelete = retrieve(runId);
		
		if(toDelete == null || (toDelete.getUser().getId() != userId )) return null;
		
		toDelete.setEnabled(false);
		
		runRepo.saveAndFlush(toDelete);
		return toDelete;
	}
	
	@Override
	public List<Run> findAllForUser(int userId) {
		
		return runRepo.findByUser_IdAndEnabled(userId, true);
	}

	@Override
	public Run findByIdAndUser(int runId, int userId) {
		
		return runRepo.findByIdAndUser_IdAndEnabled(runId, userId, true);
	}

}
