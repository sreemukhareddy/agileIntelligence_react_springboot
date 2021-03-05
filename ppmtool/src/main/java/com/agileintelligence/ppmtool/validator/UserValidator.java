package com.agileintelligence.ppmtool.validator;

import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;

import com.agileintelligence.ppmtool.domain.User;

@Component
public class UserValidator implements org.springframework.validation.Validator{

	@Override
	public boolean supports(Class<?> clazz) {
		return User.class.equals(clazz);
	}

	@Override
	public void validate(Object obj, Errors errors) {
		
		User user = (User) obj;
		
		if(!user.getPassword().equals(user.getConfirmPassword()) || user.getPassword().length() < 6) {
			errors.rejectValue("confirmPassword","Match", "Passwords must match");
			errors.rejectValue("password","Match", "Passwords must match and it must be minimum 6 chars");
		}
		
	}

}
