package com.budgettrackingtool.bttbackend.entities.transactions;

import java.util.List;

public class Transactions {

    private List<Expense> expenses;
    private List<Category> categories;

    private List<Income> incomes;

    public Transactions(List<Expense> expenses, List<Category> categories, List<Income> incomes) {
        this.expenses = expenses;
        this.categories = categories;
        this.incomes = incomes;
    }

    public List<Expense> getExpenses() {
        return expenses;
    }

    public void setExpenses(List<Expense> expenses) {
        this.expenses = expenses;
    }

    public List<Category> getCategories() {
        return categories;
    }

    public void setCategories(List<Category> categories) {
        this.categories = categories;
    }
}
