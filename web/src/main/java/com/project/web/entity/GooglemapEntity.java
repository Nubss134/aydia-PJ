package com.project.web.entity;


import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name="googlemap")
public class GooglemapEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    private String url;
    private Date updatedTime;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Date getUpdatedTime() {
        return updatedTime;
    }

    public void setUpdatedTime(Date updatedTime) {
        this.updatedTime = updatedTime;
    }

}
