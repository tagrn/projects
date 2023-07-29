package com.ssafy.iwc.model;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(	name = "users", 
		uniqueConstraints = { 
			@UniqueConstraint(columnNames = "username"),
			@UniqueConstraint(columnNames = "email") 
		})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

	
	// @GeneratedValue: 원하는 키 생성
	// @Temporal: DB 내장 데이터 타입에 맞도록 매핑
	// @JsonProperty: 데이터 어떤식으로 접근할지 / Access.WRITE_ONLY 읽어올 때 제외됨

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(length=100, nullable=false)
	private String username;

	@Column(length=100, nullable=false, unique=true)
	private String email;

	@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
	@Column(length=100, nullable=false)
	private String password;
	
	@Column(insertable = false, updatable = true)
	@ColumnDefault("0")
	private int money;
	
	
	@Column(insertable = false, updatable = false)
	@Temporal(TemporalType.DATE)
	private Date joinDate;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(	name = "user_roles", 
				joinColumns = @JoinColumn(name = "user_id"), 
				inverseJoinColumns = @JoinColumn(name = "role_id"))
	private Set<Role> roles = new HashSet<>();

	
	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
	}
}