package com.ssafy.iwc.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@Entity
@Table(name="tags")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Tag {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private long id;
	
	@Column(length=20,nullable=false)
	private String tag;

	@Column(nullable=false)
	private long no;
	
	
	@Builder
	public Tag(long id, String tag,long no) {
		
		this.id = id;
		this.tag = tag;
		this.no = no;
	}


	@Override
	public String toString() {
		return "Tag [id=" + id + ", tag=" + tag + ", no=" + no + "]";
	}
	
}
