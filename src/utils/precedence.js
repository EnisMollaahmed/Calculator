export default function getPrecedence(operator) {
    if(typeof operator !== "string")
        throw TypeError("The operator must be string in getPrecedence function!");

    switch (operator) {
      case '+':
      case '-':
        return 1;
      case '*':
      case '/':
        return 2;
      default:
        return 0;
    }
};