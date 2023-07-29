package com.ssafy.iwc.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.iwc.model.PayInfo;

@Repository
public interface PayInfoRepository extends JpaRepository<PayInfo, Long>{

	
	
	@Query(value = "select count(id) from payinfo where username = ? and postid = ?",nativeQuery = true)
	int getPayRequest(String username, long no);

	
	@Query(value = "select postid from payinfo where username = ? and cost > 0 order by id desc limit ?,?",nativeQuery = true)
	List<Long> getPayPostId(String username, int start, int idx);

	

}
