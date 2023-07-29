package com.ssafy.iwc.model;

public interface AllMainView {
	long getId();
	String getOrigFilename();
	String getFilename();
	String getFilePath();
	String getAuthor();
	Board getBoard();
	Long getGood();
	Long getViews();
	Long getLike();
	boolean UserLike();
}
