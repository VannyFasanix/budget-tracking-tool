package com.budgettrackingtool.bttbackend.entities.transactions;

import jakarta.persistence.*;

@Entity(name = "CategoryIncome")
@Table(name = "incomecategories")
public class CategoryIncome {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;
    private String name;

    private String notes;

    @OneToOne(mappedBy = "category",
            fetch = FetchType.LAZY, optional = false)
    private Income income;

    public CategoryIncome() {}

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

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public Income getIncome() {
        return income;
    }

    public void setIncome(Income income) {
        this.income = income;
    }

    @Override
    public String toString() {
        return "CategoryIncome{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", notes='" + notes + '\'' +
                ", income=" + income +
                '}';
    }
}
