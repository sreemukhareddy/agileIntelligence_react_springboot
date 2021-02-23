package com.agileintelligence.ppmtool.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.agileintelligence.ppmtool.domain.ProjectTask;

@Repository
public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long>{

	List<ProjectTask> findByProjectIdentifierOrderByPriority(String projectIdentifier);
	
	ProjectTask findByProjectSequence(String projectSequence);
	
	@Query(value = "SELECT * FROM PROJECT_TASK", nativeQuery = true)
	List<ProjectTask> getAppProjects();
}
