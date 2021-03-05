package com.agileintelligence.ppmtool.payload;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class JwtLoginSuccessResponse {

	private boolean success;
	
	private String token;

	public JwtLoginSuccessResponse(boolean success, String token) {
		this.success = success;
		this.token = token;
	}
	
	
}
