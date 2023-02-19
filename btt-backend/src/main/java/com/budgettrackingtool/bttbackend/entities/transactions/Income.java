package com.budgettrackingtool.bttbackend.entities.transactions;

import jakarta.persistence.*;

import java.sql.Date;

@Entity(name = "Income")
@Table(name = "incomes")
public class Income {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Date date;
    private String source;
    private Float amount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id",referencedColumnName="id")
    private CategoryIncome category;
    private String notes;

    public Income(){}

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

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public Float getAmount() {
        return amount;
    }

    public void setAmount(Float amount) {
        this.amount = amount;
    }

    public CategoryIncome getCategory() {
        return category;
    }

    public void setCategory(CategoryIncome category) {
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
        return "Income{" +
                "id=" + id +
                ", date=" + date +
                ", source='" + source + '\'' +
                ", amount=" + amount +
                ", category=" + category +
                ", notes='" + notes + '\'' +
                '}';
    }
}
