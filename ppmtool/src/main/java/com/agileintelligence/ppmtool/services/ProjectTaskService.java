package com.agileintelligence.ppmtool.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import com.agileintelligence.ppmtool.domain.Backlog;
import com.agileintelligence.ppmtool.domain.Project;
import com.agileintelligence.ppmtool.domain.ProjectTask;
import com.agileintelligence.ppmtool.exceptions.ProjectIdException;
import com.agileintelligence.ppmtool.exceptions.ProjectNotFoundException;
import com.agileintelligence.ppmtool.repositories.BacklogRepository;
import com.agileintelligence.ppmtool.repositories.ProjectRepository;
import com.agileintelligence.ppmtool.repositories.ProjectTaskRepository;

@Service
public class ProjectTaskService {
	
	@Autowired
	private BacklogRepository backlogRepository;
	
	@Autowired
	private ProjectTaskRepository projectTaskRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
		Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
		projectTask.setBacklog(backlog);
		if(backlog == null || backlog.getProjectIdentifier() == null || backlog.getProjectIdentifier().isEmpty()) {
			throw new ProjectNotFoundException("The project with the projectIdentifier " + projectIdentifier + " is not found");
		}
		Integer backlogSequence = backlog.getPTSequence();
		backlogSequence++;
		backlog.setPTSequence(backlogSequence);
		projectTask.setProjectSequence(projectIdentifier+"-"+backlogSequence);
		projectTask.setProjectIdentifier(projectIdentifier);
		if(projectTask.getPriority() == null || projectTask.getPriority() == 0) {
			projectTask.setPriority(3);
		}
		if(projectTask.getStatus() == null || projectTask.getStatus().isBlank()) {
			projectTask.setStatus("TO_DO");
		}
		return projectTaskRepository.save(projectTask);
	}

	public List<ProjectTask> findBacklogById(String projectId) {
		/*
		 * List<ProjectTask> dummy = projectTaskRepository.getAppProjects();
		 * System.out.println(dummy);
		 */
		Project project = projectRepository.findByProjectIdentifier(projectId);
		if(project == null || project.getProjectIdentifier().isBlank()) {
			throw new ProjectIdException("The project with the projectIdentifier " + projectId + " is not found");
		}
		List<ProjectTask> projects = projectTaskRepository.findByProjectIdentifierOrderByPriority(projectId);
		return projects;
	}
	
	// here projectTaskId is the sequence number of the projecttask
	public ProjectTask findProjectTaskByProjectSequence(String backlogId, String projectTaskId) {
		Backlog backlog = backlogRepository.findByProjectIdentifier(backlogId);
		if (backlog == null || backlog.getProjectIdentifier() == null || backlog.getProjectIdentifier().isBlank()) {
			throw new ProjectNotFoundException("The project with the projectIdentifier " + backlogId + " is not found");
		}
		ProjectTask projectTask = projectTaskRepository.findByProjectSequence(projectTaskId);
		if (projectTask == null || projectTask.getProjectIdentifier() == null
				|| projectTask.getProjectIdentifier().isBlank()) {
			throw new ProjectNotFoundException(
					"The project task with the projectTaskId " + projectTaskId + " is not found");
		}
		if (!projectTask.getProjectIdentifier().equals(backlogId)) {
			throw new ProjectNotFoundException("The project task with the projectTaskId " + projectTaskId
					+ " is not matched with the project with the projectIdentifier " + backlogId);
		}
		return projectTask;
	}
	
	public ProjectTask updateProjectTaskByProjectSequence(ProjectTask updatedTask, String backlogId, String projectSequnce) {
		ProjectTask projectTask = findProjectTaskByProjectSequence(backlogId, projectSequnce);
		projectTask = updatedTask;
		return projectTaskRepository.save(projectTask);
	}

	public void deleteProjectTask(String backlogId, String ptId) {
		ProjectTask projectTask = findProjectTaskByProjectSequence(backlogId, ptId);
		projectTaskRepository.delete(projectTask);
		projectTaskRepository.flush();
	}
	
	 

}
