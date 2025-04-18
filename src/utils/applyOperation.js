
export default function applyOperator(a, b, operator) {
    if(typeof a !== "number" || typeof b !== "number" || typeof operator !== "string")
        throw TypeError("Invalid types of parameters in applyOperator function!");

    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/':
        if (b === 0) throw new Error("Division by zero");
        return a / b;
        default:
        throw new Error(`Unknown operator: ${operator}`);
    }
};
