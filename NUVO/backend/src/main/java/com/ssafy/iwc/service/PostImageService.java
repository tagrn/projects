package com.ssafy.iwc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.PostImageDto;
import com.ssafy.iwc.model.AllView;

@Service
public interface PostImageService {
	public List<AllView> findSubImg(Long no);
	public long saveFile(PostImageDto postImageDto);
	public List<PostImageDto> getFile(long id);
	public void delPost(Long no);
}
