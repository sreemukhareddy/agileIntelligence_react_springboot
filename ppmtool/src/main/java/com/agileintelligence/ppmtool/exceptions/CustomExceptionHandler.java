package com.agileintelligence.ppmtool.exceptions;

import javax.servlet.http.HttpServletRequest;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@RestControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler{
	
	@ExceptionHandler(ProjectIdException.class)
	public ResponseEntity<?> handleProjectIdException(ProjectIdException ex, HttpServletRequest request) {
		ProjectIdExceptionResponse response = new ProjectIdExceptionResponse(ex.getMessage());
		return new ResponseEntity<ProjectIdExceptionResponse>(response, HttpStatus.BAD_REQUEST);
	}

}
