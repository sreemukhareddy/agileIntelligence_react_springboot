package com.agileintelligence.ppmtool;

public class SecurityConstants {
	
	public static final String SIGN_UP_URLS = "/api/users/**";
	public static final String H2_URL = "/h2-console/**";
	
	public static final String SECRET_KEY = "SecretKeyToGenJWTs";
	public static final String TOKEN_PREFIX = "Bearer ";
	public static final String HEADER_STRING = "Authorization";
	public static final long TOKEN_EXPIRATION_TIME_IN_MILLI_SECONDS = 30000000; // 30 sec = 30000, 30 mnts = 3000000
}
