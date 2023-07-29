package com.ssafy.iwc.dto;

import java.time.LocalDateTime;

import com.ssafy.iwc.model.PayInfo;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class PayInfoDto {
	private Long id;

	private String username;

	private Long postid;

	private int cost;

	private LocalDateTime payDate;
	
	public PayInfo toEntity() {
		PayInfo payInfo = PayInfo.builder()
				.id(id)
				.cost(cost)
				.payDate(payDate)
				.postid(postid)
				.username(username)
				.build();
		return payInfo;
	}
	
	
	@Builder
	public PayInfoDto(Long id, String username, Long postid, int cost, LocalDateTime payDate) {
		this.id = id;
		this.username = username;
		this.postid = postid;
		this.cost = cost;
		this.payDate = payDate;
	}
	
	
	
	
}
