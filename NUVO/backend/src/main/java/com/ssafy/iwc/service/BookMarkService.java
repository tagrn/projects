package com.ssafy.iwc.service;

import java.util.List;

import org.springframework.stereotype.Service;

@Service
public interface BookMarkService {

	int findCheck(String username, String targetname);

	boolean delete(String username, String targetname);

	boolean add(String username, String targetname);

	List<String> getmarkAll(String username);

}
