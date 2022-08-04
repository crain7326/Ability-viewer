import { useState } from 'react';

const Toggle = () => {
  const [left, setLeft] = useState(4);

  function handleClick() {
    if(left === 4) {
      setLeft(26);
      return;
    } 
    setLeft(4);
  }
  return (
    <div className='btnToggle-wrap, cursor-pointer'
      style={{ position: 'relative' }}
      onClick={handleClick}
    >
      {/* 테두리 */}
      <div
        className={`br-12 b-900 button-border ${left !== 26 ? 'bg-white' : 'bg-900'}`}
        style={{width: 50, height: 26}}>
      </div>
      {/* 동그라미 버튼 */}
      <div
        className={`br-circle bc-500 button-circle ${left !== 26 ? 'bg-500' : 'bg-50'}`}
        style={{ position: 'absolute', top: 3, left: left, width: 20, height: 20, transition: '.2s'}}></div>
    </div>
    
  )
};

export default Toggle;