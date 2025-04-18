import getPrecedence from '../utils/precedence';
import applyOperator from '../utils/applyOperation';
import tokenizeExpression from '../utils/tokenizer';


function RPN(tokens, outputQueue, operatorStack){
    tokens.forEach(token => {
        if (!isNaN(token)) {
        outputQueue.push(parseFloat(token));
        }
        else if (token === '(') {
        operatorStack.push(token);
        }
        else if (token === ')') {
        while (operatorStack.length > 0 && operatorStack[operatorStack.length - 1] !== '(') {
            outputQueue.push(operatorStack.pop());
        }
        if (operatorStack[operatorStack.length - 1] === '(') {
            operatorStack.pop();
        } else {
            throw new Error("Mismatched parentheses");
        }
        }
        else {
        while (
            operatorStack.length > 0 &&
            getPrecedence(operatorStack[operatorStack.length - 1]) >= getPrecedence(token)
        ) {
            outputQueue.push(operatorStack.pop());
        }
        operatorStack.push(token);
        }
    });

    while (operatorStack.length > 0) {
        const operator = operatorStack.pop();
        if (operator === '(') {
        throw new Error("Mismatched parentheses");
        }
        outputQueue.push(operator);
    }
}


export default function evaluateExpression (expression) {
    if (!expression) return 0;

    const tokens = tokenizeExpression(expression);
    const outputQueue = [];
    const operatorStack = [];

    RPN(tokens, outputQueue, operatorStack)
    const evaluationStack = [];

    for (const token of outputQueue) {
        if (typeof token === 'number') {
        evaluationStack.push(token);
        } else {
        if (evaluationStack.length < 2) {
            throw new Error("Invalid expression");
        }
        const b = evaluationStack.pop();
        const a = evaluationStack.pop();
        evaluationStack.push(applyOperator(a, b, token));
        }
    }

    if (evaluationStack.length !== 1) {
        throw new Error("Invalid expression");
    }

    return evaluationStack[0];
};