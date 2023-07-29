package com.ssafy.iwc.dto;

import java.time.LocalDateTime;

import com.ssafy.iwc.model.Board;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
public class BoardDto {
	private long id;
	private String author;
	
	private long good;
	private long views;
	private String location;
	private String nation;
	private LocalDateTime createdDate;
	private LocalDateTime modifiedDate;
	private boolean premium;
	public Board toEntity() {
		Board build = Board.builder()
				.id(id)
				.author(author)
				.good(good)
				.views(views)
				.createdDate(createdDate)
				.location(location)
				.nation(nation)
				.premium(premium)
				.build();
		return build;
	}
	@Builder
	public BoardDto(long id, String author, long good, long views, String location, String nation,
			LocalDateTime createdDate, LocalDateTime modifiedDate, boolean premium) {
		
		this.id = id;
		this.author = author;
		this.good = good;
		this.views = views;
		this.location = location;
		this.nation = nation;
		this.createdDate = createdDate;
		this.modifiedDate = modifiedDate;
		this.premium = premium;
	}
	@Override
	public String toString() {
		return "BoardDto [id=" + id + ", author=" + author + ", good=" + good + ", views=" + views + ", location="
				+ location + ", nation=" + nation + ", createdDate=" + createdDate + ", modifiedDate=" + modifiedDate
				+ "]";
	}
	
	
	
	

	
	

	
}
