export class SpendingCategory {
    public name: string;
    public color: string;
    public icon: string;

    public constructor(name: string, color: string,  icon: string) {
        this.name = name;
        this.color = color;
        this.icon = icon;
    }
}

export const SpendingCategories: SpendingCategory[] = [
    new SpendingCategory("Без категории", "#4a4a4a", "radix-icons:slash"),
    new SpendingCategory("Развлечения", "#c1ac1f", "radix-icons:accessibility"),
    new SpendingCategory("Техника", "#1f70ff", "radix-icons:gear"),
    new SpendingCategory("Здоровье", "#ff2e2e", "lucide:cross"),
    new SpendingCategory("Необходимое", "#c42eff", "radix-icons:cube")
]