package com.agileintelligence.ppmtool.exceptions;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProjectIdExceptionResponse {

	private String projectIdentifier;

	public ProjectIdExceptionResponse(String projectIdentifier) {
		this.projectIdentifier = projectIdentifier;
	}

}
