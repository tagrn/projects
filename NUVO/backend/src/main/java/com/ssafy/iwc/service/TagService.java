package com.ssafy.iwc.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.TagDto;
import com.ssafy.iwc.model.Tag;
@Service
public interface TagService {
	public long saveFile(TagDto tagDto);
	public List<Tag> findTagId(Long no);
	public void delPost(Long no);
}
