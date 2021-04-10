package com.skilldistillery.runner.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.runner.entities.Run;

public interface RunRepository extends JpaRepository<Run, Integer> {
	List<Run> findByEnabled(Boolean enabled);
	Run findByIdAndEnabled(int id, Boolean enabled);
	List<Run> findByUser_Id(int id);
	Run findByIdAndUser_Id(int runId, int userId);
}
