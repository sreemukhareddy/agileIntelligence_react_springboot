package com.agileintelligence.ppmtool.services;

import javax.persistence.EntityManager;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.agileintelligence.ppmtool.domain.Project;
import com.agileintelligence.ppmtool.exceptions.ProjectIdException;
import com.agileintelligence.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private EntityManager entityManager;
	
	public Project saveOrUpdateProject(Project project) {
		
		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			return projectRepository.save(project);
		} catch(DataIntegrityViolationException ex) {
			throw new ProjectIdException("The project id " + project.getProjectIdentifier() + " already exists");
		}
		
	}
	
	public Project findProjectByIdentifier(String projectIdentifier) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null || project.getProjectIdentifier() == null) {
			throw new ProjectIdException("The project with the id " + projectIdentifier + " doesnt exist..!");
		}
		return projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
	}
	
	public Iterable<Project> findAllProjects(){
		return projectRepository.findAll();
	}
	
	public void deleteProjectByIdentifier(String projectIdentifier) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null || project.getProjectIdentifier() == null) {
			throw new ProjectIdException("The project with the id " + projectIdentifier + " doesnt exist..!");
		}
		projectRepository.delete(project);
	}
}
