package com.ssafy.iwc.service;

import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.MainImageDto;
import com.ssafy.iwc.model.AllMainView;
import com.ssafy.iwc.model.AllView;
import com.ssafy.iwc.model.MainImage;
import com.ssafy.iwc.repository.GetAllPostsRepository;
import com.ssafy.iwc.repository.MainImageRepository;

@Service
public class MainImageServiceImpl implements MainImageService{
	@Autowired
	private MainImageRepository mainImageRepository;
	@Autowired
	private GetAllPostsRepository getAllPostsRepository;
	
	
	
	@Transactional
	public void saveFile(MainImageDto mainImageDto) {
		mainImageRepository.save(mainImageDto.toEntity());
	}
	
	@Transactional
	public List<AllMainView> getAllBoard() {
		return getAllPostsRepository.findAllBoard();
	}
	
	
	@Transactional
	public MainImageDto getFile(long id) {
		MainImage mainImage = mainImageRepository.findById(id).get();
		
		MainImageDto mainImageDto = MainImageDto.builder()
				.id(id)
				.origFilename(mainImage.getOrigFilename())
				.filename(mainImage.getFilename())
				.filePath(mainImage.getFilePath())
				.build();
		return mainImageDto;
	}

	@Transactional
	public AllMainView findMainImg(long no) {
		// TODO Auto-generated method stub
		return getAllPostsRepository.findMainImg(no);
	
	}

	@Transactional
	public void delPost(Long no) {
		// TODO Auto-generated method stub
		mainImageRepository.deleteById(no);
	}

	@Transactional
	public Optional<MainImage> findById(long id) {
		// TODO Auto-generated method stub
		return mainImageRepository.findById(id);
	}
}
