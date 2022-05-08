import indexStore from "../../store/indexStore";

export interface ViewerTypeProps  {
	type: string,
  isSelected : boolean
}	

const ViewerType = ({ type, isSelected } : ViewerTypeProps) => {
  const { optionStore } = indexStore();

  return (
    <button
      className={`unset br-8 px-8 py-4 ml-8 ${isSelected ? 'b-800 bg-800 tc-50' : 'b-800 bg-white tc-900'}`}
      style={{cursor: 'pointer'}}
      onClick={()=>optionStore.setViewerType(type === optionStore.viewer.ridi ? '리디북스' : '카카오')}
    >
      {type}
    </button>
  )
};

export default ViewerType