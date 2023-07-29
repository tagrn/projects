package com.ssafy.iwc.service;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.PostImageDto;
import com.ssafy.iwc.dto.TagDto;
import com.ssafy.iwc.model.Tag;
import com.ssafy.iwc.repository.TagRepository;
@Service
public class TagServiceImpl implements TagService{

	@Autowired
	TagRepository tagRepository;
	
	
	@Transactional 
	public List<Tag> findTagId(Long no) {
		// TODO Auto-generated method stub
		
		return tagRepository.getTagById(no);
	}
	
	
	@Transactional
	public long saveFile(TagDto tagDto) {
		return tagRepository.save(tagDto.toEntity()).getId();
	}


	@Transactional
	public void delPost(Long no) {
		// TODO Auto-generated method stub
		tagRepository.deleteTags(no);
	}
}
