package com.ssafy.iwc.controller;

import java.io.IOException;
import java.net.MulticastSocket;
import java.net.URI;
import java.net.URISyntaxException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import com.ssafy.iwc.dto.ChargeDto;
import com.ssafy.iwc.model.Amount;
import com.ssafy.iwc.model.Charge;
import com.ssafy.iwc.model.KakaoPay;
import com.ssafy.iwc.model.KakaoPayApproval;
import com.ssafy.iwc.service.ChargeService;
import com.ssafy.iwc.service.UserService;

import io.swagger.annotations.ApiOperation;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
public class KakaoPayController {

	private static final String HOST = "https://kapi.kakao.com";
	private KakaoPay kakaoPay;
	private KakaoPayApproval kakaoPayApproval;
	@Value("${yacht.app.paycode}")
	private String paycode;
	@Value("${yacht.app.domain}")
	private String Address; //접속주소

	@Autowired
	private UserService userService;
	
	@Autowired
	ChargeService chargeService;
//	결제 요청
	@ApiOperation(value = "Kakao에 결제요청 cost라는 비용을 던져줘야함", response = String.class)
	@PostMapping("/kakao")
	public String kakao(@RequestParam("cost") String cost,@RequestParam("username") String username) {
		System.out.println("카카오 결제");
		
		RestTemplate restTemplate = new RestTemplate();
		System.out.println("비용 : "+cost);
//		서버요청 헤더
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "KakaoAK "+"654e054049757a0cceb1fa50dffd3026");
		headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
//		서버요청 바디
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME");
//		주문번호 DB테이블에서 가져오기
		Long order_id = chargeService.getMax();
		
		params.add("partner_order_id", order_id.toString());
		params.add("partner_user_id", username);
		params.add("item_name", cost+"원");
//		비과세 금액보내야함
		params.add("tax_free_amount", "100");
//		수량
		params.add("quantity", "1");
//		금액
		params.add("total_amount", cost);
		params.add("approval_url", Address + "/apis/kakaoPaySuccess");
        params.add("cancel_url", Address + "/apis/kakaoPayCancel");
        params.add("fail_url", Address + "/apis/kakaoPaySuccessFail");
		String response="";
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);
        System.out.println(body);
        response+=body+"\n";
        try {
        	
        	kakaoPay = restTemplate.postForObject(new URI(HOST + "/v1/payment/ready"), body, KakaoPay.class);
            kakaoPay.setUser_id(username);
            kakaoPay.setOrder_id(order_id.toString());
            System.out.println(kakaoPay);
            response+=kakaoPay+"\n";
            return kakaoPay.getNext_redirect_pc_url();
 
        } catch (RestClientException e) {
            // TODO Auto-generated catch block
        	response+="restClientException : "+e+"\n";
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
        	response+="URIsyntaxException : "+e+"\n";
        }
        
        return response;
	}
//	결제 승인
	@ApiOperation(value = "요청된건을 승인하고 최종결제, 요청시의 pg_token을 넣어줘야함", response = String.class)
	@GetMapping("/kakaoPaySuccess")
	public void kakaoPaySuccess(@RequestParam("pg_token")String pg_token, HttpServletResponse response) {
		
		RestTemplate restTemplate = new RestTemplate();
		System.out.println("결제 완료");
		
//		서버로 요청할 header
		HttpHeaders headers = new HttpHeaders();
		headers.add("Authorization", "KakaoAK "+paycode);
		headers.add("Accept", MediaType.APPLICATION_JSON_UTF8_VALUE);
        headers.add("Content-Type", MediaType.APPLICATION_FORM_URLENCODED_VALUE + ";charset=UTF-8");
//		서버요청 바디
		MultiValueMap<String, String> params = new LinkedMultiValueMap<String, String>();
		params.add("cid", "TC0ONETIME");
		params.add("tid", kakaoPay.getTid());
//		주문번호 DB테이블에서 가져오기
		
		params.add("partner_order_id", kakaoPay.getOrder_id());
		params.add("partner_user_id", kakaoPay.getUser_id());
		

	
		params.add("pg_token", pg_token);
		
        HttpEntity<MultiValueMap<String, String>> body = new HttpEntity<MultiValueMap<String, String>>(params, headers);
        System.out.println(body);
        try {
        	
        	kakaoPayApproval = restTemplate.postForObject(new URI(HOST + "/v1/payment/approve"), body, KakaoPayApproval.class);
//          DB에 저장
        	ChargeDto chargeDto = new ChargeDto();
        	chargeDto.setId(Long.parseLong(kakaoPayApproval.getPartner_order_id()));
        	chargeDto.setTid(kakaoPayApproval.getTid());
        	chargeDto.setPayday(kakaoPayApproval.getApproved_at());
        	chargeDto.setPrice(kakaoPayApproval.getAmount().getTotal());
        	chargeDto.setUsername(kakaoPayApproval.getPartner_user_id());
        	chargeService.save(chargeDto);
//        	사용자 돈 갱신
        	userService.updateUserMoney(kakaoPayApproval.getAmount().getTotal(),kakaoPayApproval.getPartner_user_id());
        	try {
				response.sendRedirect("https://i4d110.p.ssafy.io/payresult");
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
            
//          페이지 이동
//            return "redirect:http://localhost:8000/pay";
 
        } catch (RestClientException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        } catch (URISyntaxException e) {
            // TODO Auto-generated catch block
            e.printStackTrace();
        }
        
//        return null;
		
	}
}
