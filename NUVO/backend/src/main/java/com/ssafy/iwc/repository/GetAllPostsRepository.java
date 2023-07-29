package com.ssafy.iwc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.iwc.model.AllMainView;
import com.ssafy.iwc.model.AllView;
import com.ssafy.iwc.model.Board;

@Repository
public interface GetAllPostsRepository extends JpaRepository<Board, Long>{
	@Query(value = "select p.id, p.author,  m.filename, p.good,p.views  from mainimg m,posts p where m.id = p.id  ", nativeQuery = true)
	List<AllMainView> findAllBoard();
	
	@Query(value = "select p.id, p.author, m.filename from posts p,subimg m where m.id=p.id and m.id=?", nativeQuery = true)
	List<AllView> findSubImg(Long no);

	@Query(value = "select p.id, p.author, m.filename from mainimg m, posts p where m.id=p.id and m.id=?",nativeQuery = true)
	AllMainView findMainImg(Long no);
	
//	like 갯수
//	@Query(value = "count(postsid) from like where userid=?")
//	Long HowLike(Long id);
	
//	내가 좋아요 눌렀나?
//	@Query(value = "count(postid) from like where userid=? and postsid=?")
//	int LikeThis(String id,Long postid);
	
}

