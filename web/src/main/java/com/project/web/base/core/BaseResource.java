package com.project.web.base.core;


import com.project.web.base.security.CurrentUserDetailsContainer;
import com.project.web.security.CustomUserDetails;
import org.springframework.beans.factory.annotation.Autowired;

public class BaseResource<S extends BaseService> {

    @Autowired
    protected S service;

    @Autowired
    private CurrentUserDetailsContainer userDetailsContainer;

    public CustomUserDetails getCurrentUser(){
        return this.userDetailsContainer.getUserDetails();
    }

//    @GetMapping("/{code}")
//    public Object get(@AuthenticationPrincipal CustomUserDetails currentUser,
//                                          @PathVariable("code") String code) {
//        ValidateResponse validateResponse = service.validateAndAuth(currentUser, code, ApiMode.READ);
//        if(validateResponse.isValid()) {
//            return ResponseEntity.ok(service.findByCode(code));
//        } else {
//            return ResponseEntity.status(validateResponse.getHttpStatus()).body(validateResponse);
//        }
//    }
//
//    @PutMapping("/update")
//    public Object update(@AuthenticationPrincipal CustomUserDetails currentUser,
//                                          @RequestBody D domain) {
//        ValidateResponse validateResponse = service.validateAndAuth(currentUser, domain, ApiMode.UPDATE);
//        if(validateResponse.isValid()) {
//            return ResponseEntity.ok(service.update(domain, currentUser));
//        } else {
//            return ResponseEntity.status(validateResponse.getHttpStatus()).body(validateResponse);
//        }
//    }
//
//    @DeleteMapping("/delete")
//    public Object delete(@AuthenticationPrincipal CustomUserDetails currentUser,
//                                          @RequestBody UUID code) {
//        ValidateResponse validateResponse = service.validateAndAuth(currentUser, code, ApiMode.DELETE);
//        if(validateResponse.isValid()) {
//            return ResponseEntity.ok().body(service.delete(currentUser, code));
//        } else {
//            return ResponseEntity.status(validateResponse.getHttpStatus()).body(validateResponse);
//        }
//    }
//


}
