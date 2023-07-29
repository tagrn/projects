package com.ssafy.iwc.util;

import java.io.File;
import java.io.FileInputStream;
import java.io.InputStream;

import org.springframework.beans.factory.annotation.Value;

import org.hibernate.cfg.CreateKeySecondPass;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.JSchException;
import com.jcraft.jsch.Session;
import com.jcraft.jsch.SftpException;

public class SFTPsender {
	private static final String SESSION_CONFIG_STRICT_HOST_KEY_CHECKING = "StrictHostKeyChecking";
	
	@Value("${yacht.app.domain}")
	private String Address; //접속주소
	private int Port = 22; 
	private String Username = "root" ; //아이디
	private String Password = "tntjd0206"; //비밀번호
	
	private static Channel channel = null;
	private static ChannelSftp channelSftp = null;
	private String root = "/home/mainImg";
	private String root1 = "/home/subImg";
	
	public ChannelSftp sshAccess() throws Exception{
		System.out.println("시작");
		JSch jsch = new JSch();
		Session session = createSession(jsch, Address, Username, Port);
		

		session.setPassword(Password);
		
		session.connect();
		
		channel = session.openChannel("sftp");
		channel.connect();
		
		return (ChannelSftp) channel;
		
	}
	private Session createSession(JSch jsch, String host, String username, Integer port) throws Exception{
		Session session = null;
		if(port<=0) {
			session = jsch.getSession(username,host);
			
		}else {
			session = jsch.getSession(username,host,port);
		}
		if(session ==null) {
			throw new Exception(host + " session is null");
		}
		session.setConfig(SESSION_CONFIG_STRICT_HOST_KEY_CHECKING,"no");
		return session;
	}

//	연결끊기
	private void disconnect(ChannelSftp sftp) {
        try {
            if (sftp != null) {
                if (sftp.isConnected()) {
                    sftp.disconnect();
                } else if (sftp.isClosed()) {
                }
                if (null != sftp.getSession()) {
                    sftp.getSession().disconnect();
                }
            }
        } catch (JSchException e) {
            e.printStackTrace();
        }
    }
//	파일 삭제
	public boolean deleteFile(String fileName,int flag) throws Exception {
		ChannelSftp sftp = sshAccess();
		try {
			if(flag==0) {
        		sftp.cd(root);
        	}else {
        		sftp.cd(root1);
        	}
			sftp.rm(fileName);
		}catch(SftpException e) {
			e.printStackTrace();
			return false;
		}finally {
			disconnect(sftp);
		}
		return true;
	}
//	파일 업로드
	public boolean uploadFile(String targetPath, File file,int flag) throws Exception {
        return this.uploadFile(targetPath, new FileInputStream(file), flag);
    }
	private boolean uploadFile(String targetPath, InputStream inputStream,int flag) throws Exception {
	        ChannelSftp sftp = sshAccess();
	        try {
//	        	mainImg
	        	if(flag==0) {
	        		sftp.cd(root);
	        	}else {
	        		sftp.cd(root1);
	        	}
	            
	 

	            int index = targetPath.lastIndexOf("/");
	 
	            String fileName = targetPath.substring(index + 1);
	            System.out.println("파일명: "+fileName);
	            sftp.put(inputStream, fileName);
	            return true;
	        } catch (Exception e) {
	        
	        
	            throw new Exception("Upload File failure");
	        } finally {
	            disconnect(sftp);
	        }
	    }
}
