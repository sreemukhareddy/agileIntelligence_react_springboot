package com.agileintelligence.ppmtool.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.agileintelligence.ppmtool.domain.User;
import com.agileintelligence.ppmtool.repositories.UserRepository;

@Service
public class CustomUSerDetailsService implements UserDetailsService{
	
	@Autowired
	private UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username);
		if(user == null) {
			throw new UsernameNotFoundException("Username not found");
		}
		return user;
	}
	
	@Transactional
	public User loadUserById(Long id) {
		Optional<User> optional = userRepository.findById(id);
		User user = optional.get();
		if(user == null) {
			throw new UsernameNotFoundException("Username not found");
		}
		return user;
	}

}
