package com.ssafy.iwc.model;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LocationInfo {
	Board board;
	String filePath;
	List<Tag> tags;
	List<String> subPath;
	String like;
}
