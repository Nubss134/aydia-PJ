package com.project.web.security;

import com.project.web.enums.Role;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

	@Autowired
	private AuthenticationProvider authenticationProvider;

	@Value("${application.enable-security}")
	private boolean enableSecurity;

	private org.slf4j.Logger Logger = LoggerFactory.getLogger(SecurityConfig.class);

	@Override
	public void configure(WebSecurity web) {
		web.ignoring().antMatchers("/libs/**", "/custom/**", "/js/**", "/icon/**", "/images/**", "/favicon.ico/**",
				"/webjars/springfox-swagger-ui/**", "/swagger-ui.html/**", "/swagger-resources/**", "/v1/api-docs");
	}

	@Override
	public void configure(AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(authenticationProvider);
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		if(enableSecurity){
			Logger.info("Enable application security.");
			http.authorizeRequests()
					.antMatchers("/swagger-ui.html").hasRole(Role.ADMIN.getName())
					.antMatchers("/manager/**").hasAnyRole(Role.ADMIN.getName());

		} else{
			Logger.info("Disable application security.");
			http.authorizeRequests().anyRequest().permitAll();
		}

		http.formLogin()
				.loginPage("/login")
				.permitAll()
				.loginProcessingUrl("/login")
				.defaultSuccessUrl("/manager")
				.usernameParameter("username")
				.passwordParameter("password");

		http.csrf().disable();
	}
}
