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
    const label = ref("");
    const open = ref(false);

    function Open(dialogLabel: string, ...dialogComponents: ComponentWithProps[]) {
        components.value = dialogComponents;
        label.value = dialogLabel;
        open.value = true;
    }

    function Close() {
        open.value = false;
    }

    return {components, label, open, Open, Close}
})
