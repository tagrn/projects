package com.ssafy.iwc.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.BookMarkDto;
import com.ssafy.iwc.model.BookMark;
import com.ssafy.iwc.model.BookMarkId;
import com.ssafy.iwc.repository.BookMarkRepository;

@Service
public class BookMarkSerivceImpl implements BookMarkService{
	@Autowired
	private BookMarkRepository bookMarkRepository;
	
	@Override
	public int findCheck(String username, String targetname) {
		// TODO Auto-generated method stub
		return bookMarkRepository.findCheck(username,targetname);
	}

	@Transactional
	public boolean delete(String username, String targetname) {
		// TODO Auto-generated method stub
		BookMarkId bookMarkId = new BookMarkId();
		bookMarkId.setTargetname(targetname);
		bookMarkId.setUsername(username);
		BookMark bookMark = BookMark.builder()
				.bookMarkId(bookMarkId)
				.build();
		
		try {
			bookMarkRepository.delete(bookMark);
		}catch(Exception e) {
			return false;
		}
		return true;
	}

	@Transactional
	public boolean add(String username, String targetname) {
		BookMarkId bookMarkId = new BookMarkId();
		bookMarkId.setTargetname(targetname);
		bookMarkId.setUsername(username);
		BookMark bookMark = BookMark.builder()
				.bookMarkId(bookMarkId)
				.build();
		try {
			bookMarkRepository.save(bookMark);
		}catch(Exception e) {
			return false;
		}
		return true;
	}

	@Override
	public List<String> getmarkAll(String username) {
		// TODO Auto-generated method stub
		return bookMarkRepository.getmarkAll(username);
	}

}
