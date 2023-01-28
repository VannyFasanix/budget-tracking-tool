import { Categories } from "./categories";

export class Expenses extends Categories {

  id!: number;
  date!: Date;
  store!: string;
  amount!: number;
  categoryId!: Categories;
  notes!: string;
}
