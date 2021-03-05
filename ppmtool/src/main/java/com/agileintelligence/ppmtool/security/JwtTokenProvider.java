package com.agileintelligence.ppmtool.security;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import com.agileintelligence.ppmtool.SecurityConstants;
import com.agileintelligence.ppmtool.domain.User;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtTokenProvider {

	// generate the token
	
	public String generateToken(Authentication authentication) {
		User user = (User)authentication.getPrincipal();
		Date now = new Date(System.currentTimeMillis());
		
		Date expiryDate = new Date(now.getTime() + SecurityConstants.TOKEN_EXPIRATION_TIME_IN_MILLI_SECONDS);
		
		String userId = Long.toString(user.getId());
		
		Map<String, Object> claims = new HashMap<>();
		claims.put("id", Long.toString(user.getId()));
		claims.put("username", user.getUsername());
		claims.put("fullname", user.getFullname());
		
		return Jwts.builder()
				   .setSubject(userId)
				   .setClaims(claims)
				   .setIssuedAt(now)
				   .setExpiration(expiryDate)
				   .signWith(SignatureAlgorithm.HS512, SecurityConstants.SECRET_KEY)
				   .compact();
	}
	
	// validate the token
	public boolean validateToekn(String token) {
		try {
			Jwts.parser().setSigningKey(SecurityConstants.SECRET_KEY).parseClaimsJws(token);
			return true;
		} catch(Exception e) {
			return false;
		}
	}
	
	// get user id from token
	public Long getUserIdFromJwt(String token) {
		Claims claims = Jwts.parser().setSigningKey(SecurityConstants.SECRET_KEY).parseClaimsJws(token).getBody();
		String id = (String)claims.get("id");
		return Long.parseLong(id);
	}
}
