import type {Spending} from "@/ts/AccountData/SpendingCategoriesData.ts";
import type {MoneyOperation} from "@/ts/AccountData/MoneyOperation.ts";

class AccountData {
    public budget: number;
    public spendings: Spending[];
    public incomes: MoneyOperation[];
    // TODO: make it into type
    public colorTheme: string;

}