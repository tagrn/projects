package com.ssafy.iwc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.iwc.dto.BoardDto;
import com.ssafy.iwc.model.Board;
@Repository
public interface BoardRepository extends JpaRepository<Board, Long>{
//	@Query(value = "select * from posts where location=?",nativeQuery = true)
	List<Board> findByLocation(String location);

	
	@Query(value = "select * from posts where location = ? order by id desc limit ?,?",nativeQuery = true)
	List<Board> getLocationIdxBoard(String location, int start, int idx);

	@Query(value = "select good from posts where id = ? ",nativeQuery = true)
	Long countSu(long id);

	@Modifying
	@Query(value = "update posts set good = ? where id = ? ",nativeQuery = true)
	void fixLikes(Long likes, Long id);

	@Query(value = "select distinct p.id from posts p inner join tags t on p.id=t.no where (p.location = ? and p.nation like ?)or (t.tag like ? and p.location = ?) order by p.id desc limit ?,?",nativeQuery = true)
	List<Long> getPostsNum(String location, String searchData, String searchData2,String location2, int start, int idx);

	@Query(value = "select distinct p.id from posts p inner join tags t on p.id=t.no where p.nation like ? or t.tag like ? order by p.id desc limit ?,?",nativeQuery = true)
	List<Long> getAllPostsNum(String searchData, String searchData2, int start, int idx);

	@Query(value = "select views from posts where id=?",nativeQuery = true)
	Long getView(long id);

	@Modifying
	@Query(value = "update posts set views = ? where id= ?",nativeQuery = true)
	void setView(long num,long id);

	


	@Query(value = "select * from posts where author = ? order by id desc limit ?,?",nativeQuery = true)
	List<Board> getUsernameIdxBoard(String username, int start, int idx);
}
