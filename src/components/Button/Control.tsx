import indexStore from "../../store/indexStore";

export interface IControlType {
  type: string;
}

function ControlMinus({ type }: IControlType) {
  const { optionStore } = indexStore();
  return (
    <button
      className="unset br-left b-900 px-16 active-control"
      onClick={() => optionStore.optionMinus(type)}
    >
      －
    </button>
  );
}

function ControlPlus({ type }: IControlType) {
  const { optionStore } = indexStore();
  return (
    <button
      className="unset br-right b-900 px-16 active-control"
      style={{ marginLeft: "-1px" }}
      onClick={() => optionStore.optionPlus(type)}
    >
      ＋
    </button>
  );
}

const Control = ({ type }: IControlType) => {
  return (
    <div
      className="control_wrap fs-16"
      style={{ cursor: "pointer", lineHeight: "1.5rem" }}
    >
      <ControlMinus type={type} />
      <ControlPlus type={type} />
    </div>
  );
};

export default Control;
