import { ACTION_TYPES } from "../App.jsx";

const Buttons = ({ dispatch, symbol, type }) => {
    return <button onClick={() =>  dispatch({ type: type, payload: symbol })}
            className={`cursor-pointer text-4xl font-bold bg-[rgba(255,255,255,.3)] hover:bg-[rgba(255,255,255,.6)] active:bg-[rgba(255,255,255,.9)]  rounded-2xl shadow-lg p-4 transition-all duration-200 ease-in-out flex items-center justify-center ${type == ACTION_TYPES.CLEAR_ALL ? 'text-orange-600': 'text-black'}`}>
        {type == ACTION_TYPES.REMOVE_LAST ? <img src={symbol} className="cursor- w-12 h-12" /> : symbol}
    </button>
}

export default Buttons;