package com.skilldistillery.runner.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.runner.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	List<User> findByEnabled(Boolean enabled);
	User findByIdAndEnabled(int id, Boolean enabled);
}
