package com.ssafy.iwc.service;

import org.springframework.stereotype.Service;

import com.ssafy.iwc.model.MultiId;

@Service
public interface LikeService {
	public int findLike(MultiId multiId);

	public void deleteLike(String id, String username);

	public void addLike(String id, String username);

	public void deleteAll(Long no);
}
