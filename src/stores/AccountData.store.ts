import {defineStore} from 'pinia'
import {ref} from "vue";
import {AccountData} from "@/ts/AccountData/AccountData.ts";
import {
    NewIncomeSpending,
    Spending,
    SpendingCategories,
    IsSpending
} from "@/ts/AccountData/SpendingCategoriesData.ts";
import {toast} from "vue-sonner";
import {DialogComponent, useCommonDialog} from "@/stores/CommonDialog.ts";
import ChangeBudgetDialog from "@/components/dialogs/ChangeBudgetDialog.vue";
import SpendingSelect from "@/components/dialogs/spending/SpendingSelect.vue";

export const useAccountData = defineStore('account data', () => {
    const dialog = useCommonDialog();
    const data = ref<AccountData>(new AccountData(0, [], 'auto'))

    async function NewSpending(defaultValues: number[] = [0, 0]) {
        const results = await dialog.DialogResults('Новая трата',
            new DialogComponent(ChangeBudgetDialog,
                {defaultValue: defaultValues[0], options: [-500, -100, -50, 0, 50, 100, 500], mode: 'change'}),
            new DialogComponent(SpendingSelect,
                {defaultValue: defaultValues[1]}))

        if (!results) return;

        return new Spending(results[0], new Date(Date.now()), SpendingCategories[results[1]])
    }

    async function NewIncome(defaultValue: number = 0) {
        const results = await dialog.DialogResults('Новое зачисление',
            new DialogComponent(ChangeBudgetDialog,
                {defaultValue: defaultValue, options: [-1000, -100, 0, 100, 1000], mode: 'change'}))

        if (!results) return;

        return NewIncomeSpending(results[0])
    }

    async function AddSpending() {
        const newSpending = await NewSpending();
        if (!newSpending) return;

        data.value.spendings.push(newSpending)
    }

    async function AddIncome() {
        const newIncome = await NewIncome();
        if (!newIncome) return;

        data.value.spendings.push(newIncome)
    }

    function DeleteSpending(index: number) {
        const wasSpending = IsSpending(data.value.spendings[index])
        data.value.spendings.splice(index, 1)
        toast.info(wasSpending ? 'Трата удалена' : 'Зачисление удалено')
    }

    async function EditSpending(index: number) {
        const item = data.value.spendings[index];
        const isSpending = IsSpending(item)

        let newItem;
        if (isSpending) {
            const catName = (item as Spending).category?.name;
            const categoryIndex = catName ? SpendingCategories.findIndex(x => x.name === catName) : 0;
            newItem = await NewSpending([item.amount, categoryIndex < 0 ? 0 : categoryIndex]);
        } else {
            newItem = await NewIncome(item.amount);
        }
        if (!newItem) return;

        data.value.spendings[index] = newItem
    }

    function SetBudget(amount: number) {
        data.value.budget = amount;
        toast.info("Баланс изменен")
    }

    return {data, NewSpending, NewIncome, AddSpending, AddIncome, DeleteSpending, EditSpending, SetBudget}
})
