package com.agileintelligence.ppmtool.web.controllers;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agileintelligence.ppmtool.domain.ProjectTask;
import com.agileintelligence.ppmtool.services.MapErrorValidationErrorService;
import com.agileintelligence.ppmtool.services.ProjectTaskService;

@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {

	@Autowired
	private ProjectTaskService projectTaskService;
	
	@Autowired
	private MapErrorValidationErrorService validationServie;

	//backlog_id is nothing but project_identifier
	@PostMapping("/{backlog_id}")
	public ResponseEntity<?> addProjectTaskToBacklog(@PathVariable(name = "backlog_id") String backlogId,
			@Valid @RequestBody ProjectTask projectTask, BindingResult bindingResult) {

		ResponseEntity<?> mapValidationErrors = validationServie.mapValidationService(bindingResult);
		if(mapValidationErrors != null) {
			return mapValidationErrors;
		}
		ProjectTask projectFromDB = projectTaskService.addProjectTask(backlogId, projectTask);
		return new ResponseEntity<ProjectTask>(projectFromDB, HttpStatus.CREATED);
	}
	
	@GetMapping("/{backlog_id}")
	public ResponseEntity<List<ProjectTask>> getProjectbacklog(@PathVariable(name = "backlog_id") String backlogId) {
		return new ResponseEntity<List<ProjectTask>>(projectTaskService.findBacklogById(backlogId), HttpStatus.OK);
	}
	
	@GetMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> getProjectTask(@PathVariable(name = "backlog_id") String backlogId, @PathVariable(name = "pt_id") String ptId) {
		return new ResponseEntity<ProjectTask>(projectTaskService.findProjectTaskByProjectSequence(backlogId, ptId), HttpStatus.OK);
	}
	
	// patchmapping
	@PutMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> updateProjectTask(@PathVariable(name = "backlog_id") String backlogId,
			@PathVariable(name = "pt_id") String ptId, @Valid @RequestBody ProjectTask task, BindingResult bindingResult) {
		ResponseEntity<?> mapValidationErrors = validationServie.mapValidationService(bindingResult);
		if(mapValidationErrors != null) {
			return mapValidationErrors;
		}
		ProjectTask projectTask = projectTaskService.updateProjectTaskByProjectSequence(task, backlogId, ptId);
		return new ResponseEntity<ProjectTask>(projectTask, HttpStatus.OK);
	}
	
	@DeleteMapping("/{backlog_id}/{pt_id}")
	public ResponseEntity<?> deleteProjectTask(@PathVariable(name = "backlog_id") String backlogId,	@PathVariable(name = "pt_id") String ptId) {
		projectTaskService.deleteProjectTask(backlogId, ptId);
		return new ResponseEntity<String>("The projecttask with the project task id " + ptId + " has been deleted", HttpStatus.OK);
	}
	
}
