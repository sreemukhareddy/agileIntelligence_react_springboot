package com.agileintelligence.ppmtool.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.agileintelligence.ppmtool.domain.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

	Project findByProjectIdentifier(String projectId);
	
	// Iterable<Project> findAll(); // crudrep
}
