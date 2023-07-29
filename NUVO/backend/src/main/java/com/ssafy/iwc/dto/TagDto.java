package com.ssafy.iwc.dto;


import com.ssafy.iwc.model.Tag;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
@NoArgsConstructor
public class TagDto {
	private long id;

	private String tag;
	private long no;
	
	public Tag toEntity() {
		Tag ag = Tag.builder()
				.id(id)
				.tag(tag)
				.no(no)
				.build();
		return ag;
				
	}
	@Builder
	public TagDto(long id, String tag,long no) {
		this.id = id;
		this.tag = tag;
		this.no = no;
	}
}
