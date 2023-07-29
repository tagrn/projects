package com.ssafy.iwc.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class BookMarkId implements Serializable{
	@Column(nullable = false)
	private String username;
	
	@Column(nullable = false)
	private String targetname;
}
