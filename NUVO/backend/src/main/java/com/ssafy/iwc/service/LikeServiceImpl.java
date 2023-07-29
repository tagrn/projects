package com.ssafy.iwc.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.model.Like;
import com.ssafy.iwc.model.MultiId;
import com.ssafy.iwc.repository.BoardRepository;
import com.ssafy.iwc.repository.LikeRepository;

@Service
public class LikeServiceImpl implements LikeService{

	@Autowired
	LikeRepository likeRepository;
	
	@Autowired
	BoardRepository boardRepository;
	
	@Override
	public int findLike(MultiId multiId) {
		int likes = likeRepository.findLike(multiId.getUsername(),multiId.getPostsid());
		
		return likes;
	}

	@Transactional
	public void deleteLike(String id, String username) {
		// TODO Auto-generated method stub
		
		likeRepository.deleteLike(Long.parseLong(id),username);
		long su = boardRepository.countSu(Long.parseLong(id));
		boardRepository.fixLikes(su-1,Long.parseLong(id));
	}

	@Transactional
	public void addLike(String id, String username) {
		// TODO Auto-generated method stub
		likeRepository.addLike(Long.parseLong(id),username);
		long su = boardRepository.countSu(Long.parseLong(id));
		boardRepository.fixLikes(su+1,Long.parseLong(id));
	}

	@Transactional
	public void deleteAll(Long no) {
		// TODO Auto-generated method stub
		likeRepository.deleteByNo(no);
		
	}

}
