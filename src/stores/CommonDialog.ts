import {ref, computed, type Component} from 'vue'
import { defineStore } from 'pinia'

export const useCommonDialog = defineStore('common dialog', () => {
  const component = ref<Component>();
  const label = ref("");
  const open = ref(false);

  function Open(dialogLabel:string, dialogComponent: Component){
    component.value = dialogComponent;
    label.value = dialogLabel;
    open.value = true;
  }

  function Close(){
    open.value = false;
  }

  return {component, label, open, Open, Close}
})
