package com.ssafy.iwc.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

import lombok.RequiredArgsConstructor;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
@RequiredArgsConstructor
public class SwaggerConfig{
	
//	Swagger ���� Ȯ��
//	http://localhost:8080/iwc/v2/api-docs?group=V1
//	Swagger-UI Ȯ��
//	http://localhost:8080/swagger-ui.html
	
	private String version = "v0.1.0";
	private String title = "SSAFY API " + version;
	
	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2)
				.apiInfo(apiInfo())
				.groupName(version)
				.select()
				.apis(RequestHandlerSelectors.basePackage("com.ssafy.iwc.controller"))
				.paths(PathSelectors.any())
				.build();
	}

	private ApiInfo apiInfo() {
		return new ApiInfoBuilder()
				.title(title)
				.description("API Reference for team WEEKENDOFF Developers")
				.license("SSAFY License")
				.licenseUrl("ssafy@ssafy.com").build();
	}
}
