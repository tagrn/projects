package com.ssafy.iwc.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.PayInfoDto;
import com.ssafy.iwc.model.User;
import com.ssafy.iwc.repository.BoardRepository;
import com.ssafy.iwc.repository.PayInfoRepository;
import com.ssafy.iwc.repository.UserRepository;

@Service
public class PayInfoServiceImpl implements PayInfoService{

	@Autowired
	PayInfoRepository payInfoRepository;
	@Autowired
	UserRepository userRepository;
	@Autowired
	BoardRepository boardRepositroy;
	@Override
	public int getPayRequest(String username, long no) {
		// TODO Auto-generated method stub
		return payInfoRepository.getPayRequest(username,no);
	}

	@Transactional
	public boolean saveInfo(PayInfoDto payInfoDto) {
		// TODO Auto-generated method stub
		try {
//			결제 진행
			User user = userRepository.findByUsername(payInfoDto.getUsername()).get();
			if(user.getMoney()-3<0) return false;
			userRepository.upDateMoney(user.getMoney()-3,payInfoDto.getUsername());
//			해당유저에게 코인전달
			String userName = boardRepositroy.findById(payInfoDto.getPostid()).get().getAuthor();
			int cuser = userRepository.findByUsername(userName).get().getMoney();
//			결제정보 저장
			userRepository.upDateMoney(cuser+3,userName);
			payInfoDto.setCost(3);
			payInfoRepository.save(payInfoDto.toEntity());
			
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
		
		return true;
	}
	@Transactional
	public boolean createInfo(PayInfoDto payInfoDto) {
		try {

			payInfoDto.setCost(0);
			payInfoRepository.save(payInfoDto.toEntity());
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
		
		return true;
	}
	

}
