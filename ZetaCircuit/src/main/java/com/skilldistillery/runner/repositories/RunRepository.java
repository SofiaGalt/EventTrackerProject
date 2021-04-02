package com.skilldistillery.runner.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skilldistillery.runner.entities.Run;

public interface RunRepository extends JpaRepository<Run, Integer> {

}
