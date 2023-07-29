package com.ssafy.iwc.service;

import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.PayInfoDto;

@Service
public interface PayInfoService {

	int getPayRequest(String username, long no);

	

	boolean saveInfo(PayInfoDto payInfoDto);



	boolean createInfo(PayInfoDto payInfoDto);

}
