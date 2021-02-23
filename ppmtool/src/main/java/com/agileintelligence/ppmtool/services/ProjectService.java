package com.agileintelligence.ppmtool.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.agileintelligence.ppmtool.domain.Backlog;
import com.agileintelligence.ppmtool.domain.Project;
import com.agileintelligence.ppmtool.exceptions.ProjectIdException;
import com.agileintelligence.ppmtool.repositories.BacklogRepository;
import com.agileintelligence.ppmtool.repositories.ProjectRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	/*
	 * @Autowired private EntityManager entityManager;
	 */
	
	public Project saveOrUpdateProject(Project project) {

		try {
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());

			if (project.getId() == null) {
				Backlog backlog = new Backlog();
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
				project.setBacklog(backlog);
			} else if (project.getId() != null && project.getId() != 0) {
				project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier()));
			}

			return projectRepository.save(project);
		} catch (DataIntegrityViolationException ex) {
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
