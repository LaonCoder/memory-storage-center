import React, { useState, useCallback } from "react";
import "./App.css";
import Form from "./components/Form";
import Lists from "./components/Lists.js";


const initialToDoData = localStorage.getItem('toDoData') ? JSON.parse(localStorage.getItem('toDoData')) : [];

export default function App() {

  // useState (React Hooks)
  const [toDoData, setToDoData] = useState(initialToDoData);
  const [value, setValue] = useState("");


  // Event Handlers
  const handleSubmit = (e) => {
    e.preventDefault();

    let newtoDo = {
      id: Date.now(),
      title: value,
      completed: false,
    };

    setToDoData(prev => [...prev, newtoDo]);  // Setter에서 이전 State를 가져오기 위해선 Setter함수의 인수에 함수를 사용한다.
    localStorage.setItem('toDoData', JSON.stringify([...toDoData, newtoDo]));
    setValue("");
  };

  const handleClick = useCallback((id) => {
    let newToDoData = toDoData.filter(item => item.id !== id);
    setToDoData(newToDoData);
    localStorage.setItem('toDoData', JSON.stringify(newToDoData));
  }, [toDoData]);

  const handleRemoveClick = () => {
    setToDoData([]);
    localStorage.setItem('toDoData', JSON.stringify([]));
  };


  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100">
      <div className="w-full p-6 m-4 bg-white rounded shadow lg:w-3/4 lg:max-w-lg">
        <div className="flex justify-between mb-3">
          <h1 className="text-xl">할 일 목록</h1>
          <button onClick={handleRemoveClick} className="px-3 text-gray-400 border round shadow hover:bg-gray-200 hover:text-gray-500">Clear</button>
        </div>

        {/*다른 컴포넌트 사용*/}
        <Lists toDoData={toDoData} setToDoData={setToDoData} handleClick={handleClick} />  {/*자식 컴포넌트에 Props로 부모 컴포넌트의 data, function 제공*/}
        <Form handleSubmit={handleSubmit} value={value} setValue={setValue} />
      </div>
    </div>
  );
}