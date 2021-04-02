package com.skilldistillery.runner.entities;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class Run {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	int id;
	
	@Column(name="race_title")
	private String raceTitle;
	
	private String location;
	
//	@Column(name="race_title")
//	private Integer durationSeconds;
	
	public Run() {}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}
	

	public String getRaceTitle() {
		return raceTitle;
	}

	public void setRaceTitle(String raceTitle) {
		this.raceTitle = raceTitle;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
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
