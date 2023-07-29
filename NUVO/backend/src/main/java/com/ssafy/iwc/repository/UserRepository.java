package com.ssafy.iwc.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.iwc.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	Optional <User> findByUsername(String username);
	Boolean existsByUsername(String username);
	Boolean existsByEmail(String email);
	
	@Modifying
	@Query(value = "UPDATE users set money=? where username = ?",nativeQuery = true)
	void upDateMoney(int currMoney,String username);
	
	
	
	
	@Query(value = "select count(id) from users where id = ? and username = ?",nativeQuery = true)
	int findUser(Long userid, String username);
	@Query(value = "select password from users where username = ?",nativeQuery = true)
	String findUserPw(String username);
	
	@Modifying
	@Query(value = "UPDATE users set password=? where username = ?",nativeQuery = true)
	void changePw(String encode, String username);
}
