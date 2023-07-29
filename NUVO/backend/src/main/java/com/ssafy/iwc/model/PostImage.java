package com.ssafy.iwc.model;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(	name = "subimg"
)
@Getter
@Setter
//@NoArgsConstructor, @AllArgsConstructor, @RequiredArgsConstructor - Ŭ������ �����ڸ� �������
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class PostImage {
//	@Id -> DB�� Pk�� ���� ����

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long no;
	
	
//	@Column(nullable = false)
	private long id;
	
	
//	@Column -> DB���̺� ���� �÷��� ����, name�Ӽ� : �÷����� ����, length�Ӽ� : ����Ÿ�� ������ ����(�⺻ 255 - ����)
//	���ڴ� precision�� scale�� ����, nullable�Ӽ� : null���� �������� �Ǵ�
 	@Column(nullable = false)
	private String origFilename;
	
	@Column(nullable = false)
	private String filename;
	
	@Column(nullable = false)
	private String filePath;

	@ManyToOne(cascade = {CascadeType.REMOVE})
	@JoinColumn(name = "id", insertable = false, updatable = false)
	@JsonIgnore
	private Board board=null;


//	���� ������ �̿��� ��ü ���� �޼ҵ�/Ŭ������ �������
	@Builder
	public PostImage(long no, long id, String origFilename, String filename, String filePath) {
	
		this.no = no;
		this.id = id;
		this.origFilename = origFilename;
		this.filename = filename;
		this.filePath = filePath;
	}
	
	
	
	
	
}
