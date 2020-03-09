package com.project.web.filter;


import com.project.web.base.email.EmailService;
import org.apache.commons.lang3.exception.ExceptionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.datetime.DateFormatter;
import org.springframework.stereotype.Component;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@Component
public class GlobalExceptionHandlerFilter implements Filter {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandlerFilter.class);

    @Autowired
    private EmailService emailService;

    @Override
    public void destroy() {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        try {
            chain.doFilter(request, response);
        } catch (Exception e) {
            if ("org.apache.catalina.connector.ClientAbortException".equals(e.getClass().getName())) {
                LOGGER.info("Client abort request!!");
            } else {
                LOGGER.error(e.getMessage());
                LOGGER.error("Sending error report mail");
                HttpServletRequest httpServletRequest = (HttpServletRequest) request;
                sendErrorReport(ExceptionUtils.getStackTrace(e), (HttpServletRequest) request);

                if (!httpServletRequest.getServletPath().startsWith("/api/")) {
                    HttpServletResponse httpServletResponse = (HttpServletResponse) response;
                    httpServletResponse.sendRedirect("/errorPage");
                } else {
                    throw e;
                }
            }
        }
    }

    private void sendErrorReport(String errorMessage, HttpServletRequest request) {
        DateFormatter dateFormatter = new DateFormatter("dd-MM-yyyy HH:mm");
        String subject = " CLIPON ERROR REPORT | " + dateFormatter.print(new Date(), request.getLocale());
        emailService.sendEmail(subject, errorMessage);
    }

    @Override
    public void init(FilterConfig arg0) throws ServletException {
        LOGGER.info("Init Catching exception filter.");
    }

}
