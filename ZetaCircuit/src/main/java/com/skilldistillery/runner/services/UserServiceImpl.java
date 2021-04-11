package com.skilldistillery.runner.services;

import java.util.List;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import com.skilldistillery.runner.entities.User;
import com.skilldistillery.runner.repositories.UserRepository;

@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	EntityManager em;

	@Override
	public List<User> findAll() {
		
		return userRepo.findByEnabled(true);
	}

	@Override
	public User create(User user) {
		
		return userRepo.saveAndFlush(user);
	}

	@Override
	public User retrieve(int userId) {
		
		return userRepo.findByIdAndEnabled(userId, true);
	}

	@Override
	public User update(int id, User user) {
		User originalUser = retrieve(id);
		
		if(originalUser == null) return null;
		
		if(user.getFirstName() != null) originalUser.setFirstName(user.getFirstName());
		if(user.getLastName() != null) originalUser.setLastName(user.getLastName());
		if(user.getUsername() != null) originalUser.setUsername(user.getUsername());
		
		return userRepo.saveAndFlush(originalUser);
	}

	@Override
	public User delete(int userId) {
		
		User toDelete = retrieve(userId);
		
		if(toDelete == null) return null;
		
		toDelete.setEnabled(false);
		
		userRepo.saveAndFlush(toDelete);
		return toDelete;
	}

	@Override
	public Double retrieveTotalMilesForUser(Integer userId) {
		
		return userRepo.getTotalMilesForUser(em.find(User.class, userId));
	}

}
