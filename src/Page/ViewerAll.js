import indexStore from "../store/indexStore";



const ViewerAll = () => {
  const { optionStore } = indexStore();

  return(
    <div className='bg-white'>
      {optionStore.textBundle.map((text, index) => <p key={index} className={`${optionStore.fontSize} ${optionStore.lineHeigth} ${optionStore.paragraphHeigth} ${optionStore.fontFamily}`}>{text}</p>)}
    </div>
  )
};

export default ViewerAll;