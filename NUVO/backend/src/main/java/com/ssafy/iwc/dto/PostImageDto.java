package com.ssafy.iwc.dto;

import com.ssafy.iwc.model.PostImage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class PostImageDto {
	private long id;
	private long no;
	private String origFilename;
	private String filename;
	private String filePath;
	
	public PostImage toEntity() {
		PostImage build = PostImage.builder()
				.id(id)
				.no(no)
				.origFilename(origFilename)
				.filename(filename)
				.filePath(filePath)
				.build();
		return build;
	}

	
	@Builder
	public PostImageDto(long no,long id, String origFilename, String filename, String filePath) {
		this.no = no;
		this.id = id;
		this.origFilename = origFilename;
		this.filename = filename;
		this.filePath = filePath;
	}
	
	
	
}
