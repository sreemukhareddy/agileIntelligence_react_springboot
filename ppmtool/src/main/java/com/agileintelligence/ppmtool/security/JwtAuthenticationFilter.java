package com.agileintelligence.ppmtool.security;

import java.io.IOException;
import java.util.Collections;
import java.util.function.Predicate;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import com.agileintelligence.ppmtool.SecurityConstants;
import com.agileintelligence.ppmtool.domain.User;
import com.agileintelligence.ppmtool.services.CustomUSerDetailsService;

public class JwtAuthenticationFilter extends OncePerRequestFilter{
	
	@Autowired
	private JwtTokenProvider jwtTokenProvider;
	
	@Autowired
	private CustomUSerDetailsService customUSerDetailsService;

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwt = getJwtFromRequest(request);
			if(jwt != null && jwtTokenProvider.validateToekn(jwt)) {
				Long userId = jwtTokenProvider.getUserIdFromJwt(jwt);
				User userDetails = customUSerDetailsService.loadUserById(userId);
				
				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
							userDetails, null, Collections.emptyList()
						);
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch(Exception e) {
			
		}
		
		filterChain.doFilter(request, response);
	}

	private String getJwtFromRequest(HttpServletRequest request) {
		String bearerToken = request.getHeader(SecurityConstants.HEADER_STRING);
		Predicate<String> test = str -> str != null && !str.isBlank() && str.startsWith(SecurityConstants.TOKEN_PREFIX)
				&& str.strip().length() > 6;
		if (test.test(bearerToken)) {
			String[] split = bearerToken.split(" ");
			return split[1];
		}
		return null;
	}

}
