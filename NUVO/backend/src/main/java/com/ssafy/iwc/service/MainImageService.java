package com.ssafy.iwc.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.MainImageDto;
import com.ssafy.iwc.model.AllMainView;
import com.ssafy.iwc.model.MainImage;

@Service
public interface MainImageService {
	public void saveFile(MainImageDto mainImageDto);
	public List<AllMainView> getAllBoard();
	public MainImageDto getFile(long id);
	public AllMainView findMainImg(long no);
	public void delPost(Long no);
	public Optional<MainImage> findById(long id);
}
