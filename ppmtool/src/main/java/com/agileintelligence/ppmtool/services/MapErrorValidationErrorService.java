package com.agileintelligence.ppmtool.services;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

@Service
public class MapErrorValidationErrorService {

	public ResponseEntity<?> mapValidationService(BindingResult bindingResult) {
		if(bindingResult.hasErrors()) {
			//bindingResult.
			Map<String, String> errorsMap = bindingResult.getFieldErrors().stream().collect(Collectors.toMap(FieldError::getField, FieldError::getDefaultMessage));
			
			return new ResponseEntity<Map<String, String>>(errorsMap, HttpStatus.BAD_REQUEST);
		}
		return null;
	}
}
