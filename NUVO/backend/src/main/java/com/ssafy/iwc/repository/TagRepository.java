package com.ssafy.iwc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.iwc.model.Tag;

@Repository
public interface TagRepository extends JpaRepository<Tag, Long>{
	@Query(value = "select * from tags where no = ?", nativeQuery = true)
	List<Tag> getTagById(long id);
	
	@Modifying
	@Query(value = "delete from tags where no=?",nativeQuery = true)
	int deleteTags(Long id);
}
