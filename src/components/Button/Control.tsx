import indexStore from "../../store/indexStore";

export interface ControlType  {
	type: string
}	 

function ControlMinus({type}: ControlType) {
  const { optionStore } = indexStore();
  return (
    <button
      className='unset br-left b-900 px-16 active-control'
      onClick={()=>optionStore.optionMinus(type)}
    >
      －
    </button>
  )
};

function ControlPlus({type}: ControlType) {
  const { optionStore } = indexStore();
  return (
    <button
    className='unset br-right b-900 px-16 active-control'
    style={{marginLeft: '-1px'}}
    onClick={()=>optionStore.optionPlus(type)}
    >
      ＋
    </button>
  )
};


const Control = ({type}: ControlType) => {
  return (
    <div 
      className='control_wrap fs-16 cursor-pointer'
      style={{ lineHeight: '1.5rem'}}
    >
      <ControlMinus type={type} />
      <ControlPlus type={type}/>
    </div>
  )
};

export default Control;