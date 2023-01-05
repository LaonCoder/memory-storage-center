import './App.css';
import React, { useState } from 'react';

function App() {

  const [result, setResult] = useState("");
  const [deviceOn, setDeviceOn] = useState(false);


  const onClickNum = (e) => {
    setResult((prev) => prev + e.target.value);
  };

  const onClickZero = (e) => {
    if (!(result.length === 0)) {
      setResult((prev) => prev + e.target.value);
    }
  }

  const onClickPoint = (e) => {
    console.log(result.length);
    if(result.length > 0 && !isNaN(result[result.length - 1])) {
      setResult((prev) => prev + e.target.value);
    } else if (result.length === 0) {
      setResult((prev) => prev + "0" + e.target.value);
    }
  };

  const onClickOper = (e) => {
    console.log(result.length);
    if(result.length > 0 && !isNaN(result[result.length - 1])) {
      setResult((prev) => prev + e.target.value);
    }
  };

  
  const onClickDel = () => {
    if (result.length > 0) {
      setResult((prev) => prev.slice(0, -1));
    }
  }

  const onClickAC = () => {
    setResult("");
  }

  const onClickCalc = () => {
    if (typeof result === "string") {
      let replace_str = result.replace(/×/gi, "*").replace(/÷/gi, "/");

      try {
        if (isNaN(eval(replace_str)) || eval(replace_str) === Infinity) {
          alert("NaN");
          setResult("");
          return false;
        } else {
          setResult((prev) => String(eval(replace_str)));
        }
      } catch (error) {
        alert("NaN");
        setResult("");
        return false;
      }
    }
  }

  const showResult = () => {
    if (result.length > 18) {
      return result.substring(result.length - 18, result.length);
    } else {
      return result; 
    }
  }

  return (
    <div className="App w-full m-auto bg-slate-500">
      <div className="flex justify-center items-center h-screen">
        <div class="flex flex-col items-center bg-green-200 w-60 h-72 rounded-3xl shadow-xl outline-4 outline-black">
          <div>
            <h1 className="mt-3 text-green-700 mb-2 text-sm">Tiny Calculator</h1>
          </div>

          <div className="grid grid-cols-4 gap-2">
            <p className="screen bg-slate-300 col-span-4 h-10 text-right text-lg pr-4 leading-10 rounded-md mb-1">{showResult(result, 18)}</p>
            <button className="bg-red-200 w-11 h-7 rounded-lg shadow-md" onClick={onClickAC}>AC</button>
            <button className="bg-red-200 w-11 h-7 rounded-lg shadow-md" onClick={onClickDel}>Del</button>
            <button className="bg-green-300 w-11 h-7 rounded-lg shadow-md" value="%" onClick={onClickOper}>%</button>
            <button className="bg-green-300 w-11 h-7 rounded-lg shadow-md" value="÷" onClick={onClickOper}>÷</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="7" onClick={onClickNum}>7</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="8" onClick={onClickNum}>8</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="9" onClick={onClickNum}>9</button>
            <button className="bg-green-300 w-11 h-7 rounded-lg shadow-md" value="×" onClick={onClickOper}>×</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="4" onClick={onClickNum}>4</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="5" onClick={onClickNum}>5</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="6" onClick={onClickNum}>6</button>
            <button className="bg-green-300 w-11 h-7 rounded-lg shadow-md" value="-" onClick={onClickOper}>-</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="1" onClick={onClickNum}>1</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="2" onClick={onClickNum}>2</button>
            <button className="bg-white w-11 h-7 rounded-lg shadow-md" value="3" onClick={onClickNum}>3</button>
            <button className="bg-green-300 w-11 h-7 rounded-lg shadow-md" value="+" onClick={onClickOper}>+</button>
            <button className="bg-white h-7 rounded-lg col-span-2 shadow-md" value="0" onClick={onClickZero}>0</button>
            <button className="bg-green-300 w-11 h-7 rounded-lg shadow-md" value="." onClick={onClickPoint}>.</button>
            <button className="bg-green-300 w-11 h-7 rounded-lg shadow-md" value="=" onClick={onClickCalc}>=</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
