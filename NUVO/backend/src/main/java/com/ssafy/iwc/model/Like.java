package com.ssafy.iwc.model;


import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.Table;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "likes")
@Getter
@Setter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Like {

	@EmbeddedId
	private MultiId likeId;

	
	@Builder
	public Like(MultiId likeId) {
		
		this.likeId = likeId;
	}
	
	
	
	
	
}
