import React from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import List from "./List.js";


const Lists = React.memo(({ toDoData, setToDoData, handleClick }) => {

    const handleEnd = (result) => {
        // result 매개변수에는 source 항목 및 대상 위치와 같은 드래그 이벤트에 대한 정보가 포함된다.
        console.log(result);
        if (!result.destination) return;  // 목적지가 없으면(이벤트 취소) 함수를 종료한다.

        // 리액트 불변성을 지켜주기 위해 새로운 toDoData 생성
        const newToDoData = toDoData;

        // 1. 변경시키는 아이템을 배열에서 지워준다.
        // 2. return 값으로 지워진 아이템을 잡아준다.
        const [reorderedItem] = newToDoData.splice(result.source.index, 1);

        // 원하는 자리에 reorderItem을 삽입한다.
        newToDoData.splice(result.destination.index, 0, reorderedItem);
        setToDoData(newToDoData);
        localStorage.setItem('toDoData', JSON.stringify(newToDoData));
    }

    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId='to-dos'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {toDoData.map((data, index) => (
                                <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <List
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            toDoData={toDoData}
                                            setToDoData={setToDoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                            handleClick={handleClick}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
});


export default Lists;
