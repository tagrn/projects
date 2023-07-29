package com.ssafy.iwc.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Entity;

import lombok.Data;

@Data
@Embeddable
public class MultiId implements Serializable {
	/**
	* 
	*/
	private static final long serialVersionUID = 1L;
	@Column(nullable=false)
	private String username;

	@Column(nullable=false)
	private long postsid;

}
