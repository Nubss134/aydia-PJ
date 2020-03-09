package com.project.web.base.security;


import com.project.web.security.CustomUserDetails;
import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

/**
 *  class hold current login user detail instance.
 */
@Component
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class CurrentUserDetailsContainer {

    private CustomUserDetails userDetails;

    public CustomUserDetails getUserDetails() {
        return userDetails;
    }

    public void setUserDetails(CustomUserDetails userDetails) {
        this.userDetails = userDetails;
    }
}
