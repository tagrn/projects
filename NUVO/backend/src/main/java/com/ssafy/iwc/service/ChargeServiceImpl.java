package com.ssafy.iwc.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.ChargeDto;
import com.ssafy.iwc.repository.ChargeRepository;

@Service
public class ChargeServiceImpl implements ChargeService{
	@Autowired
	private ChargeRepository chargeRepository;
	
	
	@Transactional
	public long save(ChargeDto chargeDto) {
		// TODO Auto-generated method stub
		return chargeRepository.save(chargeDto.toEntity()).getId();
	}

	@Transactional
	public long getMax() {
		// TODO Auto-generated method stub
		long maxNum=0;
		try {
			maxNum = chargeRepository.getMax();
		}catch(Exception e){
			maxNum=0;
		}
		return maxNum;
	}

}
