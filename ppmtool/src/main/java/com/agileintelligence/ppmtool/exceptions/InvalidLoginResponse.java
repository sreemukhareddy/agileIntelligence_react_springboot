package com.agileintelligence.ppmtool.exceptions;

import lombok.Data;

@Data
public class InvalidLoginResponse {
	
	private String username;
	private String password;
	public InvalidLoginResponse(String username, String password) {
		this.username = username;
		this.password = password;
	}
	public InvalidLoginResponse() {
		this.username = "Invalid username";
		this.password = "Invalid password";
	}
	
	

}
