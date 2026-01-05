import React, { useState } from 'react';

const Calculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState<string>('0');
  const [firstOperand, setFirstOperand] = useState<number | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [waitingForSecondOperand, setWaitingForSecondOperand] = useState<boolean>(false);

  const inputDigit = (digit: string) => {
    if (waitingForSecondOperand) {
      setDisplayValue(digit);
      setWaitingForSecondOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDot = () => {
    if (waitingForSecondOperand) {
      setDisplayValue('0.');
      setWaitingForSecondOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearDisplay = () => {
    setDisplayValue('0');
    setFirstOperand(null);
    setOperator(null);
    setWaitingForSecondOperand(false);
  };

  const performOperation = (nextOperator: string) => {
    const inputValue = parseFloat(displayValue);

    if (firstOperand === null) {
      setFirstOperand(inputValue);
    } else if (operator) {
      const result = calculate(firstOperand, inputValue, operator);
      setDisplayValue(String(result));
      setFirstOperand(result);
    }

    setWaitingForSecondOperand(true);
    setOperator(nextOperator);
  };

  const calculate = (first: number, second: number, op: string): number => {
    switch (op) {
      case '+': return first + second;
      case '-': return first - second;
      case '*': return first * second;
      case '/': return second !== 0 ? first / second : 0; // Prevent division by zero
      case '=': return second;
      default: return second;
    }
  };

  // Styles within component for simplicity in this MVP, 
  // normally would be in CSS modules or styled-components
  const styles = {
    wrapper: {
      width: '320px',
      backgroundColor: 'var(--calc-bg)',
      borderRadius: '20px',
      padding: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
    },
    display: {
      color: 'var(--text-white)',
      fontSize: '4rem',
      textAlign: 'right' as const,
      padding: '20px 10px',
      marginBottom: '10px',
      overflow: 'hidden',
      whiteSpace: 'nowrap' as const,
    },
    keypad: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: '12px',
    },
    btn: {
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      backgroundColor: 'var(--btn-bg)',
      color: 'var(--text-white)',
      fontSize: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: 'none',
      cursor: 'pointer',
    },
    btnZero: {
      gridColumn: '1 / span 2',
      width: '100%',
      borderRadius: '40px',
      justifyContent: 'flex-start',
      paddingLeft: '25px',
    },
    btnOp: {
      backgroundColor: 'var(--btn-operator)',
    },
    btnTop: {
      backgroundColor: 'var(--btn-top)',
      color: 'var(--text-black)',
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.display}>{displayValue}</div>
      <div style={styles.keypad}>
        {/* Top Row */}
        <button style={{...styles.btn, ...styles.btnTop}} onClick={clearDisplay}>AC</button>
        <button style={{...styles.btn, ...styles.btnTop}} onClick={() => setDisplayValue(String(parseFloat(displayValue) * -1))}>+/-</button>
        <button style={{...styles.btn, ...styles.btnTop}} onClick={() => setDisplayValue(String(parseFloat(displayValue) / 100))}>%</button>
        <button style={{...styles.btn, ...styles.btnOp}} onClick={() => performOperation('/')}>÷</button>

        {/* Row 2 */}
        <button style={styles.btn} onClick={() => inputDigit('7')}>7</button>
        <button style={styles.btn} onClick={() => inputDigit('8')}>8</button>
        <button style={styles.btn} onClick={() => inputDigit('9')}>9</button>
        <button style={{...styles.btn, ...styles.btnOp}} onClick={() => performOperation('*')}>×</button>

        {/* Row 3 */}
        <button style={styles.btn} onClick={() => inputDigit('4')}>4</button>
        <button style={styles.btn} onClick={() => inputDigit('5')}>5</button>
        <button style={styles.btn} onClick={() => inputDigit('6')}>6</button>
        <button style={{...styles.btn, ...styles.btnOp}} onClick={() => performOperation('-')}>−</button>

        {/* Row 4 */}
        <button style={styles.btn} onClick={() => inputDigit('1')}>1</button>
        <button style={styles.btn} onClick={() => inputDigit('2')}>2</button>
        <button style={styles.btn} onClick={() => inputDigit('3')}>3</button>
        <button style={{...styles.btn, ...styles.btnOp}} onClick={() => performOperation('+')}>+</button>

        {/* Row 5 */}
        <button style={{...styles.btn, ...styles.btnZero}} onClick={() => inputDigit('0')}>0</button>
        <button style={styles.btn} onClick={inputDot}>.</button>
        <button style={{...styles.btn, ...styles.btnOp}} onClick={() => performOperation('=')}>=</button>
      </div>
    </div>
  );
};

export default Calculator;