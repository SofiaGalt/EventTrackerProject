package com.skilldistillery.runner.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skilldistillery.runner.entities.Run;
import com.skilldistillery.runner.entities.User;

public interface RunRepository extends JpaRepository<Run, Integer> {
	List<Run> findByEnabled(Boolean enabled);
	Run findByIdAndEnabled(int id, Boolean enabled);
	List<Run> findByUser_IdAndEnabled(int id, boolean enabled);
	Run findByIdAndUser_IdAndEnabled(int runId, int userId, boolean enabled);
	
	@Query("SELECT SUM(r.distance) FROM Run r where r.enabled = true")
	Double getTotalMilesForAllRuns();
}
