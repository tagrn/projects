package com.ssafy.iwc.repository;


import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.iwc.model.PostImage;

@Repository
public interface PostImageRepository extends JpaRepository<PostImage, Long>{
	List<PostImage> findPostImageById(Long id);
	
	
	@Modifying
	@Query(value = "delete from subimg where id=?",nativeQuery = true)
	int deletePostImage(Long id);
}
