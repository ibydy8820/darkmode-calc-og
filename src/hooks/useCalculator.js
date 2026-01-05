import { useState } from 'react';

export const useCalculator = () => {
  const [current, setCurrent] = useState('0');
  const [previous, setPrevious] = useState(null);
  const [operator, setOperator] = useState(null);
  const [resetNext, setResetNext] = useState(false);

  const handleNumber = (num) => {
    if (resetNext) {
      setCurrent(num);
      setResetNext(false);
    } else {
      setCurrent(current === '0' ? num : current + num);
    }
  };

  const handleDecimal = () => {
    if (resetNext) {
      setCurrent('0.');
      setResetNext(false);
      return;
    }
    if (!current.includes('.')) {
      setCurrent(current + '.');
    }
  };

  const handleOperator = (op) => {
    if (operator && !resetNext) {
      calculate();
    }
    setPrevious(current);
    setOperator(op);
    setResetNext(true);
  };

  const calculate = () => {
    if (!operator || !previous) return;

    const prev = parseFloat(previous);
    const curr = parseFloat(current);
    let result = 0;

    switch (operator) {
      case '+':
        result = prev + curr;
        break;
      case '-':
        result = prev - curr;
        break;
      case '*':
        result = prev * curr;
        break;
      case '/':
        result = curr === 0 ? 'Error' : prev / curr;
        break;
      default:
        return;
    }

    // Round to avoid floating point errors (e.g. 0.1 + 0.2)
    const formattedResult = result === 'Error' 
      ? 'Error' 
      : Math.round(result * 100000000) / 100000000;

    setCurrent(String(formattedResult));
    setOperator(null);
    setPrevious(null);
    setResetNext(true);
  };

  const clear = () => {
    setCurrent('0');
    setPrevious(null);
    setOperator(null);
    setResetNext(false);
  };

  const toggleSign = () => {
    if (current === '0') return;
    setCurrent(String(parseFloat(current) * -1));
  };

  const percent = () => {
    setCurrent(String(parseFloat(current) / 100));
  };

  return {
    current,
    handleNumber,
    handleDecimal,
    handleOperator,
    calculate,
    clear,
    toggleSign,
    percent
  };
};