import deleteIcon from "../assets/delete.png";
import Buttons from "./Buttons.jsx";
import { ACTION_TYPES } from "../App.jsx";

const ButtonsLayout = ({ dispatch }) => {
    return (
        <div className="grid grid-cols-4 gap-2">
            <Buttons dispatch={dispatch} symbol={"C"} type={ACTION_TYPES.CLEAR_ALL} />
            <Buttons dispatch={dispatch} symbol={"%"} type={ACTION_TYPES.OPERATION} />
            <Buttons dispatch={dispatch} symbol={deleteIcon} type={ACTION_TYPES.REMOVE_LAST} />
            <Buttons dispatch={dispatch} symbol={"÷"} type={ACTION_TYPES.OPERATION} />
            <Buttons dispatch={dispatch} symbol={"7"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"8"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"9"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"×"} type={ACTION_TYPES.OPERATION} />
            <Buttons dispatch={dispatch} symbol={"4"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"5"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"6"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"-"} type={ACTION_TYPES.OPERATION} />
            <Buttons dispatch={dispatch} symbol={"1"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"2"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"3"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"+"} type={ACTION_TYPES.OPERATION} />
            <Buttons dispatch={dispatch} symbol={"E"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"0"} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"."} type={ACTION_TYPES.OPERAND} />
            <Buttons dispatch={dispatch} symbol={"="} type={ACTION_TYPES.OPERATION} />
        </div>
    )
}

export default ButtonsLayout;