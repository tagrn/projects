package com.ssafy.iwc.dto;

import com.ssafy.iwc.model.MainImage;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@NoArgsConstructor
public class MainImageDto {
	private long id;
	private String origFilename;
	private String filename;
	private String filePath;
	
	public MainImage toEntity() {
		MainImage build = MainImage.builder()
				.id(id)
				.origFilename(origFilename)
				.filename(filename)
				.filePath(filePath)
				.build();
		return build;
	}
	
	@Builder
	public MainImageDto(long id, String origFilename, String filename, String filePath) {
		this.id = id;
		this.origFilename = origFilename;
		this.filename = filename;
		this.filePath = filePath;
	}
}
