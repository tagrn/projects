package com.ssafy.iwc.dto;

import java.time.LocalDateTime;

import com.ssafy.iwc.model.Like;
import com.ssafy.iwc.model.MultiId;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class LikeDto {
	MultiId likeId;

	public Like toEntity() {
		Like like = Like.builder()
				.likeId(likeId)
				.build();
		return like;
	}
	
	@Builder
	public LikeDto(MultiId likeId) {
		this.likeId = likeId;
	}
	
	
	
}
