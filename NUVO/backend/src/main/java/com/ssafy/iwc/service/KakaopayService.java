package com.ssafy.iwc.service;

import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public interface KakaopayService {
	public Map<String,String> payReady();
}
