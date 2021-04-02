package com.skilldistillery.runner.entities;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Run {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	Boolean race;
	
	public Run() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public Boolean getRace() {
		return race;
	}

	public void setRace(Boolean race) {
		this.race = race;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + id;
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Run other = (Run) obj;
		if (id != other.id)
			return false;
		return true;
	}
}
