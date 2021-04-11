package com.skilldistillery.runner.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.runner.entities.Run;

public interface RunRepository extends JpaRepository<Run, Integer> {
	List<Run> findByEnabled(Boolean enabled);
	Run findByIdAndEnabled(int id, Boolean enabled);
	List<Run> findByUser_IdAndEnabled(int id, boolean enabled);
	Run findByIdAndUser_IdAndEnabled(int runId, int userId, boolean enabled);
}
