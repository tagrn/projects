package com.ssafy.iwc.model;

import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import com.google.api.client.util.DateTime;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity
@Table(name="charge")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Charge {
//	id = order_id
	@Id
	private long id;
	
	@Column(nullable = false,length=20)
	private String tid;
	
	@Column(nullable = false)
	private String username;
	
	@Column(nullable = false)
	private int price;
	
	@Column(nullable = false)
	private Date payday;

	
	@Builder
	public Charge(long id, String tid, String username, int price, Date payday) {
		
		this.id = id;
		this.tid = tid;
		this.username = username;
		this.price = price;
		this.payday = payday;
	}
	
	
	
	
}
