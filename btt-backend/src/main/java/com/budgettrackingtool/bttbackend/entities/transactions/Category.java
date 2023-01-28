package com.budgettrackingtool.bttbackend.entities.transactions;

import jakarta.persistence.*;

@Entity(name = "Category")
@Table(name = "categories")
public class Category {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String name;
    @OneToOne(mappedBy = "category_id", cascade = CascadeType.ALL,
            fetch = FetchType.LAZY, optional = false)
    private Expense expense;

    public Category() {}

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Expense getExpense() {
        return expense;
    }

    public void setExpense(Expense expense) {
        this.expense = expense;
    }

    @Override
    public String toString() {
        return "Category{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", expense=" + expense +
                '}';
    }
}
