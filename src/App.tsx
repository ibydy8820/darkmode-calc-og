import React from 'react';
import Calculator from './components/Calculator';

const App: React.FC = () => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
      <Calculator />
    </div>
  );
};

export default App;