import React, { useContext } from 'react';
import mainContext from '../context/mainContext';

function Alert() {
  const context = useContext(mainContext);
  const { alert } = context;

  const capitalize = (word) => {
    if (word === 'danger') {
      word = 'Error';
    }
    if (word) {
      const lower = word.toLowerCase();
      return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
  };

  return (
    alert && (
      <div style={{ height: '50px' }}>
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          <strong>{capitalize(alert.type)}</strong>: {alert.msg}
        </div>
      </div>
    )
  );
}

export default Alert;
