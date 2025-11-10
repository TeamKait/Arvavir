import {defineStore} from 'pinia'
import {ref, watch} from "vue";
import {AccountData} from "@/ts/firebase/AccountData/AccountData.ts";
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
import {auth} from "@/ts/firebase/firebase.ts";
import {saveAccountData} from "@/ts/firebase/AccountData/AcountData.controller.ts";

export const useAccountData = defineStore('account data', () => {
    const dialog = useCommonDialog();
    const data = ref<AccountData>(new AccountData())
    const loaded = ref(false);

    // sync control
    let suppressSave = false
    let saveTimer: any = null

    function SetFromRemote(newData: AccountData) {
        suppressSave = true
        data.value = newData
        // small next-tick delay before allowing saves again
        setTimeout(() => { suppressSave = false }, 0)
        loaded.value = true
    }

    function Reset() {
        suppressSave = true
        data.value = new AccountData()
        setTimeout(() => { suppressSave = false }, 0)
    }

    // watch changes and sync to firestore (debounced)
    watch(data, async (val) => {
        if (suppressSave) return
        const user = auth.currentUser
        if (!user) return
        if (saveTimer) clearTimeout(saveTimer)
        saveTimer = setTimeout(async () => {
            try {
                await saveAccountData(user.uid, val)
            } catch (e) {
                console.error('Failed to save account data', e)
            }
        }, 400)
    }, { deep: true })

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

    async function ChangeBudget() {
        const results = await dialog.DialogResults(
            'Изменить бюджет',
            new DialogComponent(ChangeBudgetDialog,
                {defaultValue: data.value.budget, options: [-10000, -1000, 0, 1000, 10000], mode: 'change'}))

        if (!results) return;

        SetBudget(results[0])
    }

    function SetBudget(amount: number) {
        data.value.budget = amount;
        toast.info("Баланс изменен")
    }


    return {data, loaded, NewSpending, NewIncome, AddSpending, AddIncome, DeleteSpending, EditSpending, ChangeBudget, SetBudget, SetFromRemote, Reset}
})
