package com.budgettrackingtool.bttbackend.entities.transactions;


import jakarta.persistence.*;

import java.sql.Date;


@Entity(name = "Expense")
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private String store;
    private Float amount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id",referencedColumnName="id")
    private Category category;
    private String notes;

    public Expense(){}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public String getStore() {
        return store;
    }

    public void setStore(String store) {
        this.store = store;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        this.category = category;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    @Override
    public String toString() {
        return "Expense{" +
                "id=" + id +
                ", date=" + date +
                ", store='" + store + '\'' +
                ", amount=" + amount +
                ", category_id=" + category +
                ", notes='" + notes + '\'' +
                '}';
    }
}
