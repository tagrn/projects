
package com.ssafy.iwc.service;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.dto.PostImageDto;
import com.ssafy.iwc.model.AllView;
import com.ssafy.iwc.model.PostImage;
import com.ssafy.iwc.repository.GetAllPostsRepository;
import com.ssafy.iwc.repository.PostImageRepository;

@Service
public class PostImageServiceImpl implements PostImageService{
	@Autowired
	private PostImageRepository postImageRepository;
	@Autowired
	private GetAllPostsRepository getAllPostsRepository;
	
	
	@Transactional
	public long saveFile(PostImageDto postImageDto) {
		return postImageRepository.save(postImageDto.toEntity()).getId();
	}
	
	@Transactional
	public List<AllView> findSubImg(Long no) {
		
		
		return getAllPostsRepository.findSubImg(no);
	}
	
	
	@Transactional
	public List<PostImageDto> getFile(long id) {
		
		List<PostImage> postImage = postImageRepository.findPostImageById(id);
		List<PostImageDto> postImageDto = new LinkedList<PostImageDto>();
		for(PostImage p : postImage) {
			
			PostImageDto dto = PostImageDto.builder()
					.id(id)
					.origFilename(p.getOrigFilename())
					.filename(p.getFilename())
					.filePath(p.getFilePath())
					.build();
			postImageDto.add(dto);
		};

		
		return postImageDto;
				
	}

	@Transactional
	public void delPost(Long no) {
		// TODO Auto-generated method stub
		postImageRepository.deletePostImage(no);
	}
	
}
