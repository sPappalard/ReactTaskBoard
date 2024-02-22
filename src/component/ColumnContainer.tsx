import { SortableContext, useSortable } from "@dnd-kit/sortable";
import Trashicon from "../icons/Trashicon";
import { Column, Id, Task } from "../types";
import {CSS} from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import Plusicon from "../icons/Plusicon";
import TaskCard from "./TaskCard";

interface Props {
    column: Column;
    deleteColumn: (id: Id)=> void;                  //id (to eliminate) is initialy empty
    updateColumn: (id: Id, title: string)=> void;       //prop to update Column name
    createTask: (columnId: Id) => void;             //prop to create Tasks
    deleteTask: (id: Id) => void;
    updateTask: (id: Id, content: string) => void;
    tasks: Task[];

}    


function ColumnContainer(props: Props) {
    const{column, deleteColumn, updateColumn, createTask, tasks, deleteTask, updateTask} = props;          

    const [editMode, setEditMode] = useState(false);

    const tasksIds = useMemo(() =>{                 //an array with all the Tasks ID--> This array is updated when [tasks] changes
        return tasks.map(task => task.id)
    }, [tasks])
    
    const {             //to set the DRAG and DROP
        setNodeRef,          
        attributes, 
        listeners, 
        transform, 
        transition,
        isDragging, 
    } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column,
        },
        disabled: editMode,             //disable the DRAG and DROP property during the editMode (while I set a new title of my column)
    });

    const style = {                                                         //object that contain the style CSS that must be applied to the draggable element
        transition,
        transform: CSS.Transform.toString(transform),
    }

    if(isDragging){                         //particular style if the column is in phase of dragging
        return <div  ref={setNodeRef}
        style={style} className="
        bg-columnBackgroundColor
        opacity-40
        border-2
        border-white
        w-[350px]
        h-[500px]
        max-h-[500px]
        rounded-md
        flex
        flex-col
  "></div>
    }

    return (
    <div 
        ref={setNodeRef}
        style={style}
        className="
            bg-columnBackgroundColor
            w-[350px]
            h-[500px]
            max-h-[500px]
            rounded-md
            flex
            flex-col
      ">
        {/*Column Title*/}
        <div 
            {...attributes}
            {...listeners}
            onClick={() => {
                setEditMode(true);
            }}
            className="
                bg-mainBackgroundColor
                text-md
                h-[60px]
                cursor-grab
                rounded-md
                rounded-b-none
                p-3
                font-bold
                border-columnBackgroundColor
                border-4
                flex
                items-center
                justify-between
        ">
            <div className="flex gap-2">
                <div className="
                    flex
                    justify-center
                    items-center
                    bg-columnBackgroundColor
                    px-2
                    py-1
                    text-sm
                    rounded-full
                    ">
                    0
                </div>
                {!editMode && column.title}                          
                {editMode && (
                <input className="bg-black focus: border-sky-800 border rounded outline-none px-2"         //style of the input box to change Column's name
                    value={column.title}
                    onChange={e => updateColumn(column.id, e.target.value)}
                    autoFocus
                    onBlur={() => {                 //when the element "lost the focus", I don't show the "Input" to change the title
                        setEditMode(false);         //onBlur is activeted when the element lost the focus
                    }}
                    onKeyDown={e => {
                        if (e.key !== "Enter") return;
                        setEditMode(false);
                    }}
                    />
                )}
            </div>
            <button 
                onClick={() =>{
                    deleteColumn(column.id);            //save the column's Id to Delete
                }}
            className="
            stroke-gray-500
            hover:stroke-white
            hover:bg-columnBackgroundColor
            rounded
            px-1
            py-2
            "><Trashicon/></button>
        </div>
        
            

        {/*Column Task conteiner*/}
        <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
            <SortableContext items={tasksIds}>
                {tasks.map((task) =>(                           //insert in the tasks Div the content of every new tasks (in the correct columns, specificated by the ID)
                    <TaskCard 
                        key={task.id} 
                        task = {task} 
                        deleteTask={deleteTask} 
                        updateTask={updateTask}
                    />
                ))}
            </SortableContext>
            </div>
        
        {/*Column Footer*/}
        <button className="
        flex gap-2 items-center 
        border-columnBackgroundColor 
        border-2 
        rounded-md 
        p-4 
        border-x-columnBackgroundColor 
        hover:bg-mainBackgroundColor 
        hover:text-blue-500
        active:bg-black "
        onClick={()=>{
            createTask(column.id);
        }}
        >
        <Plusicon/>    
        Add task</button>
     </div>
      );
}

export default ColumnContainer;