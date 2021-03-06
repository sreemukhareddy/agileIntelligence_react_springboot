package com.agileintelligence.ppmtool.web.controllers;

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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agileintelligence.ppmtool.domain.Project;
import com.agileintelligence.ppmtool.services.MapErrorValidationErrorService;
import com.agileintelligence.ppmtool.services.ProjectService;

@CrossOrigin
@RestController
@RequestMapping("/api/project")
public class ProjectController {

	@Autowired
	private ProjectService projectService;
	
	@Autowired
	private MapErrorValidationErrorService validationServie;
	
	@PostMapping
	public ResponseEntity<?> createNewProject(@Valid @RequestBody Project project, BindingResult bindingResult) {
		ResponseEntity<?> mapValidationService = validationServie.mapValidationService(bindingResult);
		if(mapValidationService != null) {
			return mapValidationService;
		}
		return new ResponseEntity<Project>(projectService.saveOrUpdateProject(project), HttpStatus.OK);
	}
	
	@GetMapping("/{projectId}")
	public ResponseEntity<?> findProjectByProjectIdentifier(@PathVariable String projectId) {
		return new ResponseEntity<Project>(projectService.findProjectByIdentifier(projectId), HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<Iterable<Project>> findAllProjects(){
		return new ResponseEntity<Iterable<Project>>(projectService.findAllProjects(), HttpStatus.OK);
	}
	
	@DeleteMapping("/{projectId}")
	public ResponseEntity deleteProject(@PathVariable String projectId) {
		projectService.deleteProjectByIdentifier(projectId);
		return new ResponseEntity("The project with the identifier " + projectId + " has been deleted..!",HttpStatus.OK);
	}
}
