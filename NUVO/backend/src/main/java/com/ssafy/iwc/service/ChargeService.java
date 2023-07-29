package com.ssafy.iwc.service;

import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.ChargeDto;

@Service
public interface ChargeService {
	public long save(ChargeDto chargeDto);
	public long getMax();
}
