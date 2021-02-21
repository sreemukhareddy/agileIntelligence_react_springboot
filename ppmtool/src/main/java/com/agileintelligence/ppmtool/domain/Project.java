package com.agileintelligence.ppmtool.domain;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.PreUpdate;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@NotBlank(message = "project name must not be blank")
	private String projectName;
	@NotBlank(message = "project identifier must not be blank")
	@Size(min = 4, max = 5, message = "The size of project identifier must be either 4 or 5")
	@Column(updatable = false, unique = true)
	private String projectIdentifier;
	@NotBlank(message = "project description must not be blank")
	private String description;
	@JsonFormat(pattern = "yyyy-mm-dd")
	private Date start_date;
	@JsonFormat(pattern = "yyyy-mm-dd")
	private Date end_date;
	
	@JsonFormat(pattern = "yyyy-mm-dd")
	@Column(updatable = false)
	private Date created_At;
	@JsonFormat(pattern = "yyyy-mm-dd")
	private Date updated_At;
	
	@PrePersist
	public void onCreate() {
		this.created_At = new Date();
	}
	
	@PreUpdate
	public void onUpdate() {
		this.updated_At = new Date();
	}
	
	
}
