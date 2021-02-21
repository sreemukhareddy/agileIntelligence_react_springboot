package com.agileintelligence.ppmtool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import com.agileintelligence.ppmtool.domain.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

	Project findByProjectIdentifier(String projectId);
	
	// Iterable<Project> findAll(); // crudrep
}
