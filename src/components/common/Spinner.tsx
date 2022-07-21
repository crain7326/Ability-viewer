import React from 'react';
import './spinner.css';
const Spinner = (props: { loading: boolean }) => {
  if (!props.loading) return null;
  return (
    <div className="loader_wrap">
      <div className="loader">Loading...</div>
    </div>
  );
};

export default Spinner;
