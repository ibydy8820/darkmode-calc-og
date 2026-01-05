import React from 'react';
import { useCalculator } from './hooks/useCalculator';

function App() {
  const {
    current,
    handleNumber,
    handleDecimal,
    handleOperator,
    calculate,
    clear,
    toggleSign,
    percent
  } = useCalculator();

  return (
    <div className="calc-container">
      <div className="display">{current}</div>
      
      <div className="keypad">
        <button className="gray" onClick={clear}>AC</button>
        <button className="gray" onClick={toggleSign}>+/-</button>
        <button className="gray" onClick={percent}>%</button>
        <button className="accent" onClick={() => handleOperator('/')}>÷</button>

        <button onClick={() => handleNumber('7')}>7</button>
        <button onClick={() => handleNumber('8')}>8</button>
        <button onClick={() => handleNumber('9')}>9</button>
        <button className="accent" onClick={() => handleOperator('*')}>×</button>

        <button onClick={() => handleNumber('4')}>4</button>
        <button onClick={() => handleNumber('5')}>5</button>
        <button onClick={() => handleNumber('6')}>6</button>
        <button className="accent" onClick={() => handleOperator('-')}>−</button>

        <button onClick={() => handleNumber('1')}>1</button>
        <button onClick={() => handleNumber('2')}>2</button>
        <button onClick={() => handleNumber('3')}>3</button>
        <button className="accent" onClick={() => handleOperator('+')}>+</button>

        <button className="span-2" onClick={() => handleNumber('0')}>0</button>
        <button onClick={handleDecimal}>.</button>
        <button className="accent" onClick={calculate}>=</button>
      </div>
    </div>
  );
}

export default App;