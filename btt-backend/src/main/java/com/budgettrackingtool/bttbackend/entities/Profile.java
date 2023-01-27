package com.budgettrackingtool.bttbackend.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "profile")
public class Profile {


    @Id
    @Column(name = "id")
    private Long id;

    @Column(name = "email")
    private String email;
    @Column(name = "signature")
    private String signature;

    public Profile() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSignature() {
        return signature;
    }

    public void setSignature(String signature) {
        this.signature = signature;
    }

    @Override
    public String toString() {
        return "Profile{" +
                "id=" + id +
                ", email='" + email + '\'' +
                ", signature='" + signature + '\'' +
                '}';
    }
}
