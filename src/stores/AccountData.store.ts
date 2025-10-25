import {defineStore} from 'pinia'
import {ref} from "vue";
import {AccountData} from "@/ts/AccountData/AccountData.ts";
import {
    IncomeSpendingCategory,
    NewIncomeSpending,
    Spending,
    SpendingCategories,
    IsSpending
} from "@/ts/AccountData/SpendingCategoriesData.ts";
import {toast} from "vue-sonner";
import {ComponentWithProps, useCommonDialog} from "@/stores/CommonDialog.ts";
import ChangeBudgetDialog from "@/components/dialogs/ChangeBudgetDialog.vue";
import SpendingSelect from "@/components/dialogs/spending/SpendingSelect.vue";

const dialog = useCommonDialog();
export const useAccountData = defineStore('account data', () => {
    const data = ref<AccountData>(new AccountData(0, [], [], 'dark'))

    async function NewSpending(defaultValue:number = 0) {
        const results = await dialog.DialogResults('Новая трата',
            new ComponentWithProps(ChangeBudgetDialog,
                {defaultValue: defaultValue, options: [-500, -200, -100, 0, 100, 200, 500], mode: 'change'}),
            new ComponentWithProps(SpendingSelect))

        if (!results) return;

        return new Spending(results[0], new Date(Date.now()), SpendingCategories[results[1]])
    }

    async function NewIncome(defaultValue:number = 0){
        const results = await dialog.DialogResults('Новое зачисление',
            new ComponentWithProps(ChangeBudgetDialog,
                {defaultValue: defaultValue, options: [-500, -100, 0, 100, 500], mode: 'change'}))

        if (!results) return;

        return NewIncomeSpending(results[0])
    }

    async function AddSpending() {
        const newSpending = await NewSpending();
        if (!newSpending) return;

        data.value.spendings.push(newSpending)
    }

    async function AddIncome(amount: number) {
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

        const newItem = isSpending ? await NewSpending(item.amount) : await NewIncome(item.amount);
        if (!newItem) return;

        data.value.spendings[index] = newItem
    }

    function SetBudget(amount: number) {
        data.value.budget = amount;
        toast.info("Баланс изменен")
    }

    return {data, NewSpending, NewIncome, AddSpending, AddIncome, DeleteSpending, EditSpending, SetBudget}
})
