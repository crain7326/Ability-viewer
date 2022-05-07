const submitType = Object.freeze({
  login: 'login',
  register: 'register'
});

export interface SubmitProps  {
	type: string,
  value : string
}	

const Submit = ({ type, value }: SubmitProps) => {
  return (
    <button 
      className='unset br-12 b-500 bg-500 tc-50 w-full' 
      style={{textAlign: 'center', height: 48, cursor: 'pointer'}}
    >
      {value}
    </button>
  )
};

export default Submit;