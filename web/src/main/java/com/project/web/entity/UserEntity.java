package com.project.web.entity;
import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name = "user")

public class UserEntity extends BaseEntity {

	private String username;
	private String password;
	private String role;
	private String name;

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
