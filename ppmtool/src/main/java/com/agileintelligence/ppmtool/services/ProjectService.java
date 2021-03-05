package com.agileintelligence.ppmtool.services;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Service;

import com.agileintelligence.ppmtool.domain.Backlog;
import com.agileintelligence.ppmtool.domain.Project;
import com.agileintelligence.ppmtool.domain.User;
import com.agileintelligence.ppmtool.exceptions.ProjectIdException;
import com.agileintelligence.ppmtool.repositories.BacklogRepository;
import com.agileintelligence.ppmtool.repositories.ProjectRepository;
import com.agileintelligence.ppmtool.repositories.UserRepository;

@Service
public class ProjectService {

	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private UserRepository userRepository;
	
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
		return project;
	}
	
	public Project findProjectByIdentifier(String projectIdentifier, String username) {
		Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());
		if(project == null || project.getProjectIdentifier() == null || !project.getProjectLeader().equals(username)) {
			throw new ProjectIdException("The project with the id " + projectIdentifier + " doesnt exist..!");
		}
		return project;
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

	public Project saveOrUpdateProject(@Valid Project project, String username) {
		try {
			User user = userRepository.findByUsername(username);
			project.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
			project.setUser(user);
			project.setProjectLeader(username);
			if (project.getId() == null) {
				Backlog backlog = new Backlog();
				backlog.setProject(project);
				backlog.setProjectIdentifier(project.getProjectIdentifier().toUpperCase());
				project.setBacklog(backlog);
			} else if (project.getId() != null && project.getId() != 0) {
				Project existingProject = findProjectByIdentifier(project.getProjectIdentifier(), username);
				if(!existingProject.getUser().getUsername().equals(username)) {
					throw new ProjectIdException("The project with the id " + project.getProjectIdentifier() + " doesnt exist..!");
				}
				project.setBacklog(backlogRepository.findByProjectIdentifier(project.getProjectIdentifier()));
			}

			return projectRepository.save(project);
		} catch (DataIntegrityViolationException ex) {
			throw new ProjectIdException("The project id " + project.getProjectIdentifier() + " already exists");
		}
	}

	public Iterable<Project> findAllProjects(String name) {
		return projectRepository.findByProjectLeader(name);
		//return projectRepository.findAll();
	}

	public void deleteProjectByIdentifier(String projectId, String name) {
		projectRepository.delete(findProjectByIdentifier(projectId, name));
		
	}
}
