package com.ssafy.iwc.model;

import java.time.LocalDateTime;
import java.util.LinkedList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="posts")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
//@EntityListeners(AuditingEntityListener.class) //JPA���� �ش� Entity�� Auditing����� ������� �˸�
public class Board {

	@Id
	@GeneratedValue
	private long id;
	
	@Column(length=10,nullable =false)
	private String author;
	
	@Column
	@ColumnDefault("0")
	private long good;
	
	@Column
	@ColumnDefault("0")
	private long views;
	
	@Column(nullable = false, length=100)
	private String location;
	@Column(nullable = false, length=20)
	private String nation;
	
	@CreationTimestamp
	@Column(updatable = false)
	private LocalDateTime createdDate;
	
	
	@Column(nullable = false)
	@ColumnDefault("false")
	private boolean premium;
	
	@UpdateTimestamp
	private LocalDateTime modifiedDate;

	
//	@OneToOne(cascade = CascadeType.REMOVE)
//	@JoinColumn(name="id")
//	private AllView allView;

//	
//	@OneToMany(cascade = CascadeType.REMOVE)
//	@JoinColumn(name="id")
//	private List<AllView> postImage = new LinkedList<>();

	@Builder
	public Board(long id, String author, long good, long views, String location, String nation,
			LocalDateTime createdDate, boolean premium, LocalDateTime modifiedDate) {
		super();
		this.id = id;
		this.author = author;
		this.good = good;
		this.views = views;
		this.location = location;
		this.nation = nation;
		this.createdDate = createdDate;
		this.premium = premium;
		this.modifiedDate = modifiedDate;
	}


	@Override
	public String toString() {
		return "Board [id=" + id + ", author=" + author + ", good=" + good + ", views=" + views + ", location="
				+ location + ", nation=" + nation + ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate
				+ "]";
	}


	


	

	
	
	
	
	
	
}
