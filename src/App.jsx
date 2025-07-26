import { useReducer } from "react";
import Decimal from "decimal.js";
import ButtonsLayout from "./components/ButtonsLayout";
import Display from "./components/Display";
import "./App.css";

/* TODO List:
  - Fix percent calculation
  - Fix Decimal bug
  - Fix subtraction
  - Implement expand button
  - Add keyboard support
*/

export const ACTION_TYPES = {
  CLEAR_ALL: 0,
  REMOVE_LAST: 1,
  OPERATION: 2,
  OPERAND: 3,
  EXPAND: 4,
}

const DIGIT_TYPES = {
  INTEGER: 0,
  PERCENT: 1,
  OPERATOR: 2,
  RESULT: 3,
  NEGATIVE: 4,
}

// FULLY AI GENERATED FUNCTION
const evaluate = (input) => {
  const tokens = input.match(/-?\d+\.?\d*%?|[+\-×÷]/g);
  if (!tokens) return 'Invalid input';

  const precedence = { '+': 1, '-': 1, '×': 2, '÷': 2 };
  const isOperator = (t) => ['+', '-', '×', '÷'].includes(t);

  const convertedTokens = [];
  let lastNumber = null;

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];

    if (token.endsWith('%')) {
      const percentValue = new Decimal(token.slice(0, -1));
      let base = lastNumber ?? new Decimal(0);
      const value = base.times(percentValue.div(100));
      convertedTokens.push(value);
      lastNumber = value;
    } else if (isOperator(token)) {
      convertedTokens.push(token);
      lastNumber = null; // reset for next %
    } else {
      const number = new Decimal(token);
      convertedTokens.push(number);
      lastNumber = number;
    }
  }

  // Handle single standalone value like "50%" → ["0.5"]
  if (convertedTokens.length === 1 && convertedTokens[0] instanceof Decimal) {
    return convertedTokens[0].toFixed();
  }

  // Shunting-yard to RPN
  const outputQueue = [];
  const operatorStack = [];

  convertedTokens.forEach((token) => {
    if (token instanceof Decimal) {
      outputQueue.push(token);
    } else if (isOperator(token)) {
      while (
        operatorStack.length &&
        isOperator(operatorStack[operatorStack.length - 1]) &&
        precedence[operatorStack[operatorStack.length - 1]] >= precedence[token]
      ) {
        outputQueue.push(operatorStack.pop());
      }
      operatorStack.push(token);
    }
  });

  while (operatorStack.length) {
    outputQueue.push(operatorStack.pop());
  }

  // Evaluate RPN
  const stack = [];
  const ops = {
    '+': (a, b) => a.plus(b),
    '-': (a, b) => a.minus(b),
    '×': (a, b) => a.times(b),
    '÷': (a, b) => b.isZero() ? new Decimal(NaN) : a.div(b),
  };

  for (const token of outputQueue) {
    if (token instanceof Decimal) {
      stack.push(token);
    } else if (isOperator(token)) {
      const b = stack.pop();
      const a = stack.pop();
      if (!a || !b) return 'Error';
      const result = ops[token](a, b);
      stack.push(result);
    }
  }

  const finalResult = stack[0];
  return finalResult && !finalResult.isNaN() ? finalResult.toFixed() : 'Error';
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case ACTION_TYPES.CLEAR_ALL:
      return {...state, value: "", lastDigitType: DIGIT_TYPES.RESULT, result: ""}
      break
      return state
    case ACTION_TYPES.REMOVE_LAST:
      if (state.value === "") {
        return state
      } else {
        const newValue = state.value.slice(0, -1);
        if (newValue === "") {
          return {...state, value: newValue, lastDigitType: DIGIT_TYPES.RESULT, result: ""}
        } else if (newValue.endsWith("%")) {
          return {...state, value: newValue, lastDigitType: DIGIT_TYPES.PERCENT, result: evaluate(newValue)}
        } else if (newValue === "-") {
          return {...state, value: newValue, lastDigitType: DIGIT_TYPES.NEGATIVE, result: ""}
        } else if (newValue.endsWith("+") || newValue.endsWith("-") || newValue.endsWith("×") || newValue.endsWith("÷")) {
          return {...state, value: newValue, lastDigitType: DIGIT_TYPES.OPERATOR, result: evaluate(newValue.slice(0, -1))}
        } else {
          return {...state, value: newValue, lastDigitType: DIGIT_TYPES.INTEGER, result: evaluate(newValue)}
        }
      }
      break
    case ACTION_TYPES.OPERATION:
      if (state.lastDigitType === DIGIT_TYPES.NEGATIVE) {
        return state
      } else if (state.value === "") {
        if (payload === "-") {
          return {...state, value: payload, lastDigitType: DIGIT_TYPES.NEGATIVE, result: ""}
        } else {
          return state
        }
      }
      switch (payload) {
        case "%":
          if (state.lastDigitType !== DIGIT_TYPES.INTEGER) {
            return state
          } else {
            return {...state, value: `${state.value}${payload}`, lastDigitType: DIGIT_TYPES.PERCENT, result: evaluate(state.value + payload)}
          }
        case "=":
          return {...state, value: state.result, lastDigitType: DIGIT_TYPES.RESULT, result: ""}
        default:
          if (state.lastDigitType === DIGIT_TYPES.OPERATOR) {
            return {...state, lastDigitType: DIGIT_TYPES.OPERATOR, value: state.value.slice(0, -1) + payload}
          } else if (state.lastDigitType !== DIGIT_TYPES.RESULT) {
            return {...state, value: `${state.value}${payload}`, lastDigitType: DIGIT_TYPES.OPERATOR, result: state.result}
          }
      }
      break
    case ACTION_TYPES.OPERAND:
      if (payload === ".") {
        if (state.value.includes(".")) {
          return state
        } else if (state.lastDigitType !== DIGIT_TYPES.INTEGER) {
          return {...state, value: `${state.value || ""}0${payload}`, lastDigitType: DIGIT_TYPES.INTEGER, result: state.result}
        }
      }
      if (state.lastDigitType === DIGIT_TYPES.RESULT) {
        return {...state, value: payload, lastDigitType: DIGIT_TYPES.INTEGER, result: ""}
      } else if (state.value === "0") {
        return {...state, value: payload}
      } else {
        return {...state, value: `${state.value}${payload}`, lastDigitType: DIGIT_TYPES.INTEGER, result: evaluate(state.value + payload)}
      }
      break
    case ACTION_TYPES.EXPAND:
      return state
      break
  }
}

const App = () => {
  const [{ value, lastDigitType, result }, dispatch] = useReducer(reducer, {value: "", lastDigitType: "", result: ""});

  return (
    <div className="bg-[rgba(255,255,255,.25)] backdrop-blur-lg rounded-2xl shadow-2xl border-3 border-[rgba(255,255,255,.2)] p-6 w-full max-w-md">
      <Display value={value} result={result} />
      <ButtonsLayout dispatch={dispatch} />
    </div>
  );
};

export default App;
