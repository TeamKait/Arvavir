import {toast} from "vue-sonner";

export function CopyToClipboard(text: string) {
    navigator.clipboard.writeText(text).then(r => toast.success("Скопировано"));
}