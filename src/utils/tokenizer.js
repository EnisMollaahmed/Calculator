export default function tokenizeExpression(expression) {
    const tokens = [];
    let currentNumber = '';
    let i = 0;

    while (i < expression.length) {
      const char = expression[i];

      // Skip whitespace
      if (char === ' ') {
        i++;
        continue;
      }

      // Handle negative numbers (either at start or after an operator)
      if (char === '-' && 
          (i === 0 || ['+', '-', '*', '/', '('].includes(expression[i-1]))) {
        currentNumber += char;
        i++;
        continue;
      }

      // Handle operators and parentheses
      if (['+', '-', '*', '/', '(', ')'].includes(char)) {
        // Push any accumulated number first
        if (currentNumber !== '') {
          tokens.push(currentNumber);
          currentNumber = '';
        }
        tokens.push(char);
        i++;
      }
      // Handle numbers and decimal points
      else if (!isNaN(char) || char === '.') {
        currentNumber += char;
        i++;
      } else {
        throw new Error(`Invalid character: ${char}`);
      }
    }

    // Push any remaining number
    if (currentNumber !== '') {
      tokens.push(currentNumber);
    }

    return tokens;
  };