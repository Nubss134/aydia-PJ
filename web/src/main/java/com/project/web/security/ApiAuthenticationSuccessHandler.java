package com.project.web.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.savedrequest.HttpSessionRequestCache;
import org.springframework.security.web.savedrequest.RequestCache;
import org.springframework.security.web.savedrequest.SavedRequest;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

/**
 * Handle return response when authentication success
 */
@Component
public class ApiAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
	
	private RequestCache requestCache = new HttpSessionRequestCache();

	private static final Logger LOGGER = LoggerFactory.getLogger(ApiAuthenticationSuccessHandler.class);

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {
		// Caching previous request
		SavedRequest savedRequest = requestCache.getRequest(request, response);

		if (savedRequest == null) {
			clearAuthenticationAttributes(request);
			responseAuthenticationInfo(authentication, response);
			return;
		}
		String targetUrlParam = getTargetUrlParameter();
		if (isAlwaysUseDefaultTargetUrl()
				|| (targetUrlParam != null && StringUtils.hasText(request.getParameter(targetUrlParam)))) {
			requestCache.removeRequest(request, response);
			clearAuthenticationAttributes(request);
			responseAuthenticationInfo(authentication, response);
			return;
		}

		clearAuthenticationAttributes(request);
		responseAuthenticationInfo(authentication, response);
	}

	public void setRequestCache(RequestCache requestCache) {
		this.requestCache = requestCache;
	}

	public void responseAuthenticationInfo(Authentication authentication, HttpServletResponse response)
			throws IOException {
		CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
		ObjectMapper objectMapper = new ObjectMapper();
		try {
			response.getWriter().write(objectMapper.writeValueAsString(userDetails));
		} catch (IOException e) {
			LOGGER.error("Error when try to parse authentication info to json data");
			LOGGER.error(e.getMessage());
			response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
			return;
		}

		response.setStatus(HttpServletResponse.SC_OK);
	}
}
