package com.ssafy.iwc.dto;



import java.util.Date;

import com.ssafy.iwc.model.Charge;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ChargeDto {
	private long id;
	
	private String tid;
	
	private String username;
	
	private int price;
	
	private Date payday;
	
	public Charge toEntity() {
		Charge charge = Charge.builder()
				.id(id)
				.tid(tid)
				.username(username)
				.price(price)
				.payday(payday)
				.build();
		return charge;
	}

	@Builder
	public ChargeDto(long id, String tid, String username, int price, Date payday) {
		this.id = id;
		this.tid = tid;
		this.username = username;
		this.price = price;
		this.payday = payday;
	}
	
	
}
