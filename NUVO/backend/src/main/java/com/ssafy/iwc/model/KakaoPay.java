package com.ssafy.iwc.model;

import java.util.Date;

import lombok.Data;

@Data
public class KakaoPay {
	private String tid, next_redirect_pc_url,user_id,order_id;
    private Date created_at;
	@Override
	public String toString() {
		return "KakaoPay [tid=" + tid + ", next_redirect_pc_url=" + next_redirect_pc_url + ", created_at=" + created_at
				+ "]";
	}
    
}
