package com.ssafy.iwc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.BoardDto;
import com.ssafy.iwc.model.Board;

@Service
public interface BoardService {
	public long savePost(BoardDto boardDto);
	public Board getPost(long id);
	public void delPost(Long no);
	public List<Board> getLocationBoard(String location);
	public List<Board> getLocationIdxBoard(String location, int start, int idx);
	public Board findById(long no);
	public List<Long> getPostsNum(String location, String searchData, int start, int idx);
	public List<Long> getAllPostsNum(String searchData, int start, int idx);
	public void increaseView(long id);
	
	public List<Board> getUsernameBoard(String username, int start, int idx);
	public List<Board> getPayBoard(String username, int start, int idx);
}
