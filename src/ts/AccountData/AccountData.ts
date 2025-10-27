import type {Spending} from "@/ts/AccountData/SpendingCategoriesData.ts";
import type {ColorTheme} from "@/ts/ColorTheme.ts";
import {ref, type Ref} from "vue";

export class AccountData {
    public budget: number;
    public spendings: Spending[];
    public colorTheme: Ref<ColorTheme>;

    public constructor(budget: number, spendings: Spending[], colorTheme: ColorTheme = 'auto') {
        this.budget = budget;
        this.spendings = spendings;
        this.colorTheme = ref<ColorTheme>(colorTheme);
    }
}