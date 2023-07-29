package com.ssafy.iwc.model;

import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookmark")
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class BookMark {
	
	@EmbeddedId
	private BookMarkId bookMarkId;

	
	
	@Builder
	public BookMark(BookMarkId bookMarkId) {
		this.bookMarkId = bookMarkId;
	}
}
