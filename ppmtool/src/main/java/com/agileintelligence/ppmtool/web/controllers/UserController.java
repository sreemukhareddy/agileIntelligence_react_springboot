package com.agileintelligence.ppmtool.web.controllers;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.agileintelligence.ppmtool.SecurityConstants;
import com.agileintelligence.ppmtool.domain.User;
import com.agileintelligence.ppmtool.payload.JwtLoginSuccessResponse;
import com.agileintelligence.ppmtool.payload.LoginRequest;
import com.agileintelligence.ppmtool.security.JwtTokenProvider;
import com.agileintelligence.ppmtool.services.MapErrorValidationErrorService;
import com.agileintelligence.ppmtool.services.UserService;
import com.agileintelligence.ppmtool.validator.UserValidator;

@RestController
@RequestMapping("/api/users")
public class UserController {
	
	@Autowired
	private MapErrorValidationErrorService validationServie;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserValidator userValidator;
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private AuthenticationManager authenticationManager;
	
	@PostMapping("/login")
	public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest, BindingResult bindingResult) {
		ResponseEntity<?> mapValidationService = validationServie.mapValidationService(bindingResult);
		if(mapValidationService != null) {
			return mapValidationService;
		}
		Authentication authenticate = authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(
							loginRequest.getUsername(),
							loginRequest.getPassword()
							)
				);
		SecurityContextHolder.getContext().setAuthentication(authenticate);
		String jwt = SecurityConstants.TOKEN_PREFIX + jwtTokenProvider.generateToken(authenticate);
		
		return ResponseEntity.ok(new JwtLoginSuccessResponse(true, jwt));
	}

	@PostMapping("/register")
	public ResponseEntity<?> registerUser(@Valid @RequestBody User user, BindingResult bindingResult) {
		userValidator.validate(user, bindingResult);
		ResponseEntity<?> mapValidationService = validationServie.mapValidationService(bindingResult);
		if(mapValidationService != null) {
			return mapValidationService;
		}
		return new ResponseEntity<User>(userService.saveUser(user), HttpStatus.CREATED);
	}
}
