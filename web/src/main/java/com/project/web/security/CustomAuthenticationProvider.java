package com.project.web.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class CustomAuthenticationProvider implements AuthenticationProvider {

	@Autowired
	private UserDetailsService userDetailsService;

	@Autowired
	private BCryptPasswordEncoder passwordEncoder;

	@Override
	public Authentication authenticate(Authentication authentication) throws AuthenticationException {
		String username = authentication.getName();
		String password = authentication.getCredentials().toString();
		CustomUserDetails userDetails;
		try {
			userDetails = (CustomUserDetails) userDetailsService.loadUserByUsername(username);
		} catch (UsernameNotFoundException e) {
			throw new BadCredentialsException(e.getMessage());
		}
		if (passwordEncoder.matches(password, userDetails.getPassword())) {
			return new UsernamePasswordAuthenticationToken(userDetails, password, userDetails.getAuthorities());
		} else {
			throw new BadCredentialsException("Username or password is in-correct");
		}
	}

	@Override
	public boolean supports(Class<?> authentication) {
		return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
	}

	public static void main(String[] args) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		System.out.println(bCryptPasswordEncoder.encode("112233123")); // $2a$10$CYelMTWANaYs.NSIbkH7v.eBNkvXbWzs1pgkX5er6r8DxeKy25x2e
		System.out.println(bCryptPasswordEncoder.matches("hedspi2a", "$2a$10$aCX7m45HKrJ/6jWiCgAGIulBV2iE3CELTrTEeF3ir08Ft3sOOLi9y"));
	}
}
