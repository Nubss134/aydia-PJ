package com.project.web.entity;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "home")
public class HomeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String title;
    private String contentVi;
    private String contentJpn;
    private String image;
    private Date createdTime;
    private Date updatedTime;
    private boolean isDeleted;


    public HomeEntity() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContentVi() {
        return contentVi;
    }

    public void setContentVi(String contentVi) {
        this.contentVi = contentVi;
    }

    public String getContentJpn() {
        return contentJpn;
    }

    public void setContentJpn(String contentJpn) {
        this.contentJpn = contentJpn;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Date getCreatedTime() {
        return createdTime;
    }

    public void setCreatedTime(Date createdTime) {
        this.createdTime = createdTime;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

    public boolean isDeleted() {
        return isDeleted;
    }

    public void setDeleted(boolean deleted) {
        isDeleted = deleted;
    }
}
