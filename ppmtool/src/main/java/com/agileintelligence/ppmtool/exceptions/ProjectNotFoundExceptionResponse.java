package com.agileintelligence.ppmtool.exceptions;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectNotFoundExceptionResponse {

	private String projectNotFound;

	public ProjectNotFoundExceptionResponse(String projectNotFound) {
		this.projectNotFound = projectNotFound;
	}
	
	
}
