package com.agileintelligence.ppmtool.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.BeanIds;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.agileintelligence.ppmtool.SecurityConstants;
import com.agileintelligence.ppmtool.services.CustomUSerDetailsService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(
			securedEnabled = true,
			jsr250Enabled = true,
			prePostEnabled = true
		)
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private JwtAuthenticationEntryPoint unauthorizedhandler;
	
	@Autowired
	private CustomUSerDetailsService customUserDetailsService;
	
	@Autowired
	private BCryptPasswordEncoder bcryptPasswordEncoder;
	
	@Bean
	public JwtAuthenticationFilter getJwtAuthenticationFilter() {
		return new JwtAuthenticationFilter();
	}


	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http.cors().and().csrf().disable()
						 .exceptionHandling()
						 .authenticationEntryPoint(unauthorizedhandler)
						 .and()
						 .sessionManagement()
						 .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
						 .and()
						 .headers()
						 .frameOptions()
						 .sameOrigin()
						 .and()
						 .authorizeRequests()
						 .antMatchers(
			                        "/",
			                        "/favicon.ico",
			                        "/**/*.png",
			                        "/**/*.gif",
			                        "/**/*.svg",
			                        "/**/*.jpg",
			                        "/**/*.html",
			                        "/**/*.css",
			                        "/**/*.js"
			                ).permitAll()
						 .antMatchers(SecurityConstants.SIGN_UP_URLS).permitAll()
						 .antMatchers(SecurityConstants.H2_URL).permitAll()
						 .anyRequest()
						 .authenticated();
		
		http.addFilterBefore(getJwtAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class);
	}

	@Override
	protected void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception {
		authenticationManagerBuilder.userDetailsService(customUserDetailsService).passwordEncoder(bcryptPasswordEncoder);
	}

	@Override
	@Bean(BeanIds.AUTHENTICATION_MANAGER)
	protected AuthenticationManager authenticationManager() throws Exception {
		return super.authenticationManager();
	}

	
	
}