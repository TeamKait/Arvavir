function Round(value: number, digits: number) {
    const factor = Math.pow(10, digits);
    return Math.round(value * factor) / factor;
}

export { Round };