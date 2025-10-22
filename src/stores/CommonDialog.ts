import {ref, computed, type Component} from 'vue'
import {defineStore} from 'pinia'

export class ComponentWithProps {
    public component: Component
    public props: object | null

    public constructor(component: Component, props: object | null = null) {
        this.component = component
        this.props = props
    }
}

export const useCommonDialog = defineStore('common dialog', () => {
    const components = ref<Array<ComponentWithProps>>([])
    const results = ref<Array<any>>([])
    const label = ref("");
    const open = ref(false);

    let resolver: ((value: any) => void) | null = null;

    async function GetResults(dialogLabel: string, ...dialogComponents: ComponentWithProps[]) {
        components.value = dialogComponents;
        results.value = Array(dialogComponents.length);
        label.value = dialogLabel;
        open.value = true;

        let res: unknown;
        await new Promise(resolve => {
            resolver = resolve;
        }).then(r => res = r);
        return res as Array<any>;
    }

    function ResolveDialog(value: Array<any> | null){
        if(resolver){
            resolver(value);
            resolver = null;
        }
        open.value = false;
    }

    function Confirm(){
        ResolveDialog(results.value);
    }

    function Cancel(){
        ResolveDialog(null);
    }

    return {components, results, label, open, GetResults, Confirm, Cancel}
})
