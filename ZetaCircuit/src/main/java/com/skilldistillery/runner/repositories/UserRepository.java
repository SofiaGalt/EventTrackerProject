package com.skilldistillery.runner.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.runner.entities.User;

public interface UserRepository extends JpaRepository<User, Integer> {
	List<User> findByEnabled(Boolean enabled);
	User findByIdAndEnabled(int id, Boolean enabled);
	
	@Query("SELECT SUM(r.distance) FROM Run r where r.user = :user and r.enabled = true")
	Double getTotalMilesForUser(@Param("user") User u);
}
