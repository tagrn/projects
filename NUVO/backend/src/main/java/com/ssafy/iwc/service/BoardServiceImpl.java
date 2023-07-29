package com.ssafy.iwc.service;

import java.util.LinkedList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.BoardDto;
import com.ssafy.iwc.model.Board;
import com.ssafy.iwc.repository.BoardRepository;
import com.ssafy.iwc.repository.PayInfoRepository;


@Service
public class BoardServiceImpl implements BoardService{
	@Autowired
	private BoardRepository boardRepository;

	@Autowired
	private PayInfoRepository payRepository;
	
	  
	@Transactional 
	public long savePost(BoardDto boardDto) { 
		return boardRepository.save(boardDto.toEntity()).getId(); 
	}
	 

	@Transactional
	public Board getPost(long id) {
		Board board = boardRepository.findById(id).get();

		return board;

	}


	@Transactional
	public void delPost(Long no) {
		// TODO Auto-generated method stub
		boardRepository.deleteById(no);
	}



	@Transactional
	public List<Board> getLocationBoard(String location) {
		// TODO Auto-generated method stub
		return boardRepository.findByLocation(location);
	}
	

	@Transactional
	public List<Board> getLocationIdxBoard(String location, int start, int idx) {
		// TODO Auto-generated method stub
		return boardRepository.getLocationIdxBoard(location,start,idx);
	}


	@Override
	public Board findById(long no) {
		// TODO Auto-generated method stub
		return boardRepository.findById(no).get();
	}


	@Override
	public List<Long> getPostsNum(String location, String searchData, int start, int idx) {
		// TODO Auto-generated method stub
		return boardRepository.getPostsNum(location,searchData,searchData,location,start,idx);
	}


	@Override
	public List<Long> getAllPostsNum(String searchData, int start, int idx) {
		// TODO Auto-generated method stub
		return boardRepository.getAllPostsNum(searchData,searchData,start,idx);
	}


	@Transactional
	public void increaseView(long id) {
		Long num = boardRepository.getView(id);
		boardRepository.setView(num+1,id);
		
	}


	@Override
	public List<Board> getUsernameBoard(String username, int start, int idx) {
		// TODO Auto-generated method stub
		return boardRepository.getUsernameIdxBoard(username,start,idx);
	}


	@Override
	public List<Board> getPayBoard(String username, int start, int idx) {
//		결제 목록 가져오기
		List<Board> result = new LinkedList<>();
		List<Long> posts = payRepository.getPayPostId(username,start,idx);
		System.out.println(posts);
		for(long num : posts) {
			try {
				result.add(boardRepository.findById(num).get());
			}catch(Exception e) {
				continue;
			}
			
		}
		return result;
	}


	
}
