import React, { useState } from 'react';
import './Calculator.css';
import evaluateExpression from '../utils/evaluateExpression';

const digitsAndPoint = ['9', '8', '7', '6', '5', '4', '3', '2', '1', '.', '0', '±'];
const operators = ['+', '-', '*', '/', '(', ')', '='];
const specialButtons = ['C', '⌫'];

const Calculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleClick = (value) => {
    if (value === '=') {
      try {
        if (!input.trim()) {
          setResult('Error: No input');
          return;
        }
        const evalResult = evaluateExpression(input);
        setResult(evalResult.toString());
      } catch (error) {
        setResult(error.message || 'Error');
      }
    } else if (value === 'C') {
      setInput('');
      setResult('');
    } else if (value === '⌫') {
      setInput(prev => prev.slice(0, -1)); // Remove last character
    } else if (value === '±') {
      if (input.length > 0) {
        setInput(prev => {
          if (['+', '-', '*', '/'].includes(prev.slice(-1))) {
            return prev + '-';
          }
          const parts = prev.split(/([+\-*/])/);
          const lastPart = parts.pop();
          if (!isNaN(lastPart)) {
            parts.push(lastPart.startsWith('-') ? lastPart.slice(1) : '-' + lastPart);
            return parts.join('');
          }
          return prev + '-';
        });
      } else {
        setInput('-');
      }
    } else {
      setInput(prevInput => prevInput + value);
    }
  };

  return (
    <section className="calc-body">
      <section className="display">
        <section className="input">{input}</section>
        <section className="result">{result}</section>
      </section>
      <section className="special-buttons">
        {specialButtons.map((btn, index) => (
          <button key={index} onClick={() => handleClick(btn)}>
            {btn}
          </button>
        ))}
      </section>
      <section className="buttons">
        <section className="num-buttons">
          {digitsAndPoint.map((digit, index) => (
            <button className='btn' key={index} onClick={() => handleClick(digit)}>
              {digit}
            </button>
          ))}
        </section>
        <section className="operator-buttons">
          {operators.map((operator, index) => (
            <button className='btn' key={index} onClick={() => handleClick(operator)}>
              {operator}
            </button>
          ))}
        </section>
      </section>
    </section>
  );
};

export default Calculator;