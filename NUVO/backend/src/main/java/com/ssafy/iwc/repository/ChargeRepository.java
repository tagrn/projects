package com.ssafy.iwc.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.ssafy.iwc.model.Charge;
@Repository
public interface ChargeRepository extends JpaRepository<Charge, Long>{

	@Query(value = "select max(id) id from charge",nativeQuery = true)
	Long getMax();

}
