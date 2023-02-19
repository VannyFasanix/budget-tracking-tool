import { IncomeCategories } from "./incomecategories";

export class Incomes extends IncomeCategories {

  id!: number;
  date!: Date;
  source!: string;
  amount!: number;
  category!: IncomeCategories;
  notes!: string;
}
