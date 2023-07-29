package com.ssafy.iwc.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "mainimg")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MainImage {

	
	
	@Id
	private long id;
	
	@Column(nullable = false)
	private String origFilename;
	
	@Column(nullable = false)
	private String filename;
	
	@Column(nullable = false)
	private String filePath;

//	@OneToOne(mappedBy = "id")
//	private Board board;

	@OneToOne(cascade = {CascadeType.REMOVE})
	@JoinColumn(name = "id", insertable = false, updatable = false)
	@JsonIgnore
	private Board board;
	
	@Builder
	public MainImage(long id, String origFilename, String filename, String filePath) {
		
		this.id = id;
		this.origFilename = origFilename;
		this.filename = filename;
		this.filePath = filePath;
	}
	
	
	
	
}
