package com.project.web.enums;

public enum Role {

	ADMIN("ADMIN"), COMPANY_ADMIN("COMPANY_ADMIN"), COMPANY_USER("COMPANY_USER");;
	
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	private Role(String name) {
		this.name = name;
	}

}
