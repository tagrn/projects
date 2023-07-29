package com.ssafy.iwc.service;

import java.util.HashSet;
import java.util.Set;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.ssafy.iwc.model.ERole;
import com.ssafy.iwc.model.Role;
import com.ssafy.iwc.model.User;
import com.ssafy.iwc.model.request.SignupRequest;
import com.ssafy.iwc.repository.RoleRepository;
import com.ssafy.iwc.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private RoleRepository roleRepository;
	
	@Autowired
	private PasswordEncoder encoder;

	@Autowired
	private JavaMailSender javaMailSender;
	

	@Override
	public boolean signUpUser(SignupRequest signUpRequest) {
		User user = new User(signUpRequest.getUsername(), 
				 signUpRequest.getEmail(),
				 encoder.encode(signUpRequest.getPassword()));
		
		Set<String> strRoles = signUpRequest.getRole();
		Set<Role> roles = new HashSet<>();

		if (strRoles == null) {
			Role userRole = roleRepository.findByName(ERole.ROLE_USER)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			roles.add(userRole);
		} else {
			strRoles.forEach(role -> {
				switch (role) {
				case "admin":
					Role adminRole = roleRepository.findByName(ERole.ROLE_ADMIN)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(adminRole);

					break;
				case "mod":
					Role modRole = roleRepository.findByName(ERole.ROLE_MODERATOR)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(modRole);

					break;
				default:
					Role userRole = roleRepository.findByName(ERole.ROLE_USER)
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					roles.add(userRole);
				}
			});
		}
		user.setRoles(roles);
		userRepository.save(user);
		
		return true;
	}
	
	@Override
	public boolean checkIdDuplication(String username) {
		System.out.println("service " + username);
		if (userRepository.existsByUsername(username)) {
			System.out.println("here");
			return true;
		}
		return false;
	}

	@Override
	public boolean checkEmailDuplication(String uemail) {
		if (userRepository.existsByEmail(uemail)) {
			return true;
		}
		return false;
	}

	@Override
	public boolean send(String subject, String text, String to) {
		SimpleMailMessage message = new SimpleMailMessage();
		message.setTo(to);
		message.setSubject(subject);
		message.setText(text);
		javaMailSender.send(message);
		
		return true;
	}

	@Transactional
	public void updateUserMoney(Integer total, String userid) {
		// TODO Auto-generated method stub
		User user = userRepository.findByUsername(userid)
				.orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + userid));
		int currMoney = user.getMoney();
//		금액에따른 인센티브
		if(total>=50000) {
			currMoney+=total*1.2;
		}else if(total>=40000) {
			currMoney+=total*1.125;
		}else if(total>=20000) {
			currMoney+=total*1.1;
		}else {
			currMoney+=total;
		}
		

		
		userRepository.upDateMoney(currMoney,userid);
	}

	@Override
	public User getUserInfo(String username) {
		// TODO Auto-generated method stub
		User user = userRepository.findByUsername(username).get();
		user.setPassword("");
		user.setEmail("");
		return user;
	}

	@Override
	public boolean findUser(Long userid, String username) {
		// TODO Auto-generated method stub
		int num = userRepository.findUser(userid,username);
		if(num==1) {
			return true;
		}else {
			return false;
		}
		
	}

	@Override
	public boolean checkPw(String password, String username) {
		// TODO Auto-generated method stub
		
		
		if(encoder.matches(password, userRepository.findUserPw(username))){
			return true;
		}
		return false;
	}

	@Transactional
	public boolean changePw(String password, String username,String currpassword) {
		// TODO Auto-generated method stub
		if(!encoder.matches(currpassword, userRepository.findUserPw(username))){
			return false;
		}
		try {
			userRepository.changePw(encoder.encode(password),username);
			return true;
		}catch(Exception e) {
			System.out.println(e);
			return false;
		}
		
	}


}
