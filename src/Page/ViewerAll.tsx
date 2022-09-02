import indexStore from '../store/indexStore';

const ViewerAll = () => {
  const { optionStore } = indexStore();

  return (
    <div className="bg-white pt-24">
      <div className={`${optionStore.paragraphHeigth}`}>
      {optionStore.textBundle.map((text, index) => (
        <p
          key={index}
          className={`${optionStore.viewerType} ${optionStore.fontSize} ${optionStore.lineHeigth}  ${optionStore.fontFamily}`}
        >
          {text}
        </p>
      ))}
        </div>
    </div>
  );
};

export default ViewerAll;
