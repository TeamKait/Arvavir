import type {Spending} from "@/ts/AccountData/SpendingCategoriesData.ts";

export class AccountData {
    public budget: number;
    public spendings: Spending[];
    public incomes: Spending[];
    // TODO: make it into type
    public colorTheme: string;

    public constructor(budget: number, spendings: Spending[], incomes: Spending[], colorTheme: string) {
        this.budget = budget;
        this.spendings = spendings;
        this.incomes = incomes;
        this.colorTheme = colorTheme;
    }
}