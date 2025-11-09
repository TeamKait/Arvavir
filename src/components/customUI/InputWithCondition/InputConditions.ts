export function NotEmpty(text: string): boolean{
    return text.length > 0;
}

export function ValidEmail(email: string): boolean {
    const dogs = email.split("@").length - 1
    return dogs > 0 && dogs < 2 && !email.startsWith("@") && !email.endsWith("@");
}

export interface ConditionWithError{
    condition: Function;
    error: string;
}