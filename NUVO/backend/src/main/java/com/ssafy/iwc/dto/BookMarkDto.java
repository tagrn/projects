package com.ssafy.iwc.dto;

import com.ssafy.iwc.model.BookMark;
import com.ssafy.iwc.model.BookMarkId;


import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class BookMarkDto {

	BookMarkId bookMarkId;
	
	public BookMark toEntity() {
		BookMark bookMark = BookMark.builder()
				.bookMarkId(bookMarkId)
				.build();
		return bookMark;
	}

	
	
	@Builder
	public BookMarkDto(BookMarkId bookMarkId) {

		this.bookMarkId = bookMarkId;
	}
	
}
