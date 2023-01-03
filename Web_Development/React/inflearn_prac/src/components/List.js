import React, { useState } from 'react'


const List = React.memo(({ id, title, completed, toDoData, setToDoData, provided, snapshot, handleClick }) => {

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(title);


    const handleCheckboxToggled = (id) => {
        let newToDoData = toDoData.map((item) => {
            if (item.id === id) {
                item.completed = !item.completed;  // Toggle
            }
            return item;
        });
        setToDoData(newToDoData);
        localStorage.setItem('toDoData', JSON.stringify(newToDoData));
    }

    const handEditChange = (event) => {
        setEditedTitle(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        let newToDoData = toDoData.map(data => {
            if(data.id === id) {
                data.title = editedTitle;
            }
            return data;
        });
        setToDoData(newToDoData);
        localStorage.setItem('toDoData', JSON.stringify(newToDoData));
        setIsEditing(false);
    }


    if (isEditing) {
        return (
            <div className={"flex items-center justify-between w-full px-4 py-1 my-2 bg-gray-100 text-gray-600 border rounded"}>
                <div className="items-center">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={editedTitle}
                            onChange={handEditChange}
                            className="w-full px-3 py-2 mr-4 text-gray-500 rounded"
                        />
                    </form>
                </div>
                <div className='items-center'>
                    <button className="px-4 py-2 float-right" onClick={() => setIsEditing(false)}>
                        x
                    </button>
                    <button className="px-4 py-2 float-right" type="submit" onClick={handleSubmit}>
                        save
                    </button>
                </div>
            </div>
        );
    }
    else {
        return (
            <div
                key={id}
                {...provided.draggableProps}
                ref={provided.innerRef}
                {...provided.dragHandleProps}
                className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"} flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
            >
                <div className="items-center">
                    <input
                        type="checkbox"
                        onChange={() => handleCheckboxToggled(id)}
                        defaultChecked={completed ? true : false}
                    />{" "}
                    {/* 'true && "line-through"'인 경우 단락평가에 의해 오른쪽에 위치한 "line-through"가 형 변환 없이 반환된다. */}
                    <span className={completed && "line-through"}>{title}</span>
                </div>
                <div className='items-center'>
                    <button className="px-4 py-2 float-right" onClick={() => handleClick(id)}>
                        x
                    </button>
                    <button className="px-4 py-2 float-right" onClick={() => setIsEditing(true)}>
                        edit
                    </button>
                </div>
            </div>
        );
    }
});


export default List;