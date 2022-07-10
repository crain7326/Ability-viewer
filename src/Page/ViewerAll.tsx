import indexStore from '../store/indexStore';

const ViewerAll = () => {
  const { optionStore } = indexStore();

  return (
    <div className="bg-white h-full pt-24">
      {optionStore.textBundle.map((text, index) => (
        <p
          key={index}
          className={`${optionStore.fontSize} ${optionStore.lineHeigth} ${optionStore.paragraphHeigth} ${optionStore.fontFamily}`}
        >
          {text}
        </p>
      ))}
    </div>
  );
};

export default ViewerAll;
