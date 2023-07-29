package com.ssafy.iwc.model;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.CreationTimestamp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="payinfo")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PayInfo {
	
	@Id
	@GeneratedValue
	private Long id;
	
	
	@Column(nullable = false, length=100)
	private String username;
	
	@Column(nullable= false)
	private Long postid;
	
	@Column(nullable = false)
	private int cost;
	
	@CreationTimestamp
	@Column(updatable = false)
	private LocalDateTime payDate;

	
	
	@Builder
	public PayInfo(Long id, String username, Long postid, int cost, LocalDateTime payDate) {
		
		this.id = id;
		this.username = username;
		this.postid = postid;
		this.cost = cost;
		this.payDate = payDate;
	}
	
	
	
	
}
