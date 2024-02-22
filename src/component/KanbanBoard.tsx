import { useMemo, useState } from "react";
import Plusicon from "../icons/Plusicon";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";                     // library for drag and drop of items
import { SortableContext, arrayMove } from "@dnd-kit/sortable";            //this allows the columns to be dragged and dropped orderly
import { createPortal } from "react-dom";
import TaskCard from "./TaskCard";


function KanbanBoard() {
    const [columns, setColumns] = useState<Column[]>([]);       //array wich contain all the columns 
    const columsId = useMemo(() => columns.map((col) => col.id), [columns]);   //useMemo allow to memorize the array "column ID" that contain the ID of each columns. This array is updated when [columns] changes

    const [tasks, setTasks] =useState<Task[]>([]);                 //array wich contain all the Tasks

    const [activeColumn, setActiveColumn] = useState<Column | null>(null);     //State that can be of COLUMN TYPE (if i drag a column) or NULL (if I don't dragging anythyng)--> The initial value is (null)

    const[activeTask, setActiveTask] = useState <Task |null> (null);

    const sensors = useSensors( useSensor(PointerSensor,{                   //use this "sensor" to activate tha drag and drop ONLY when the distance traveled by the mouse pointer will be at least 3px       
            activationConstraint: {                                         //use this Sensor allow to make it work both drag and drop and delete button
                distance: 3, //3px
            }
        } ));
    

    return (

        
    <div
        className="
            m-auto
            flex
            min-h-screen
            w-full
            items-center
            overflow-x-auto
            overflow-y-hidden
            px-[40px]
    "
    >
        
    <DndContext 
        sensors={sensors}               //drag and drop is activeted ONLY when the movement of mouse pointer is at least 3px
        onDragStart={onDragStart} 
        onDragEnd={onDragEnd}
        onDragOver={onDragOver}         
        >                
            <div className="m-auto flex gap-4">                                        
            <div className="flex gap-4">
                <SortableContext items={columsId}>
                    {columns.map((col) => (     
                        <ColumnContainer   //for each column we return a <div> that contain the "ColumnConteiner" (title,Content,Footer)
                            key = {col.id} 
                            column={col} 
                            deleteColumn={deleteColumn}   
                            updateColumn={updadeColumn}
                            createTask={createTask}
                            deleteTask={deleteTask}
                            updateTask={updateTask}
                            tasks={tasks.filter(task => task.columnId == col.id)}
                        />
                    ))}     
                </SortableContext>
            </div>      
        <button                             
            onClick= {() =>{
                createNewColumn();
            }} 
            className="
                h-[60px]
                w-[350px]
                min-w-[350px]
                cursor-pointer
                rounded-lg
                bg-mainBackgroundColor
                border-2
                border-columnBackgroundColor
                p-4
                ring-blue-500
                hover:ring-2
                flex
                gap-2
                ">
            <Plusicon/>
            Add Column
        </button>
        </div>

       {createPortal (
        <DragOverlay>
            {activeColumn && (              //used to show a visual preview of the column in phase of dragging 
                <ColumnContainer
                column={activeColumn}           //is rendered a <ColumnContainer> component (the visual preview) only if "ActiveColumn" isn't null = there is a column in phase of dragging
                deleteColumn={deleteColumn}
                updateColumn={updadeColumn}
                createTask={createTask}
                updateTask={updateTask}
                deleteTask={deleteTask}
                tasks={tasks.filter(
                    task => task.columnId == activeColumn.id
                    )}
                />
            )}    
              
            {activeTask && (
                <TaskCard 
                task = {activeTask} 
                deleteTask={deleteTask}
                updateTask={updateTask} 
                />
                
                
            )}    
        </DragOverlay>, 
        document.body
        )}
    </DndContext>
    </div> 
    );  


    function updateTask(id: Id, content: string){
        const newTasks = tasks.map(task=>{
            if (task.id !== id) return task;
            return{...task, content}
        });
        setTasks(newTasks);
    }

    function deleteTask(id: Id) {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
    }

    function createNewColumn() {                                            //create a new column with
        const columnToAdd:Column = {
            id: generateId(),                                               //Id random generated                         
            title: `Column ${columns.length + 1}`,                          //Title "Column" + +Number of the column*
        }

        setColumns([...columns, columnToAdd]);                              //Set the array of the columns like "colomns (pre-exsting)" + "newColumn"
    }

    function deleteColumn (id: Id) {                                        
        console.log("DELETE");
        const filteredColumn = columns.filter(col => col.id !== id);        //filter the array "colums", with an equal array without the column deleted 
        setColumns(filteredColumn);                                         //colums = filter array
0  
        const newTasks = tasks.filter(t => t.columnId !== id);          //delete the tasks contained in the Column
        setTasks(newTasks);
    }

    function updadeColumn(id: Id, title: string){
        const newColumns = columns.map(col=>{                           //for the entire Array of columns
            if(col.id !== id) return col;                           //if the "Id != ID updated Column" --> return column without changement
            return{...col, title};                                  //else (if Id== ID update Columns) --> return column with NEW TITLE "title"
        });

        setColumns(newColumns);                                    //return the entire Array columns (with changement)
    }

    function createTask (columnId: Id){
        const newTask: Task = {
            id: generateId(),
            columnId,
            content: `Task ${tasks.length + 1}`, 
        };

        setTasks([...tasks, newTask]);          //set the array Tasks with "...previous tasks" plus "NewTasks"
 

    }

    function onDragStart(event: DragStartEvent){   //i'm using this function to track that "I'm actually dragging a column"
        console.log("DRAG START", event);
        if (event.active.data.current?.type === "Column"){  //if the type is "Column". We use ? to access the type property (event.active.data.current) ONLY if the property is NOT NULL or DEFINED (no NULL, no UNDEFINED) 
            setActiveColumn(event.active.data.current.column);   //if the element dragging is a Column, then I use "setActiveColumn" to memorize the active column. This is useful to keep track of the column that is currently in phase of dragging
            return;
        }

        if (event.active.data.current?.type === "Task"){  
            setActiveTask(event.active.data.current.task);   
            return;
        }
        
    }

    function onDragEnd (event: DragEndEvent){
        setActiveColumn(null);
        setActiveTask(null);

        const {active, over} = event;

        if(!over) return;       //if we don't have a "over" element--> do not nothink--> because it means we are not dragging over a valid element

        const activeColumnId = active.id;        //active item (column that I move/drag on the target item)
        const overColumnId = over.id;           // target item (column that replace with active item)

        if(activeColumnId === overColumnId)  return;            //if I remain in the same position

        setColumns(columns => {
            const activeColumnIndex = columns.findIndex(col => col.id === activeColumnId);         
            const overColumnIndex = columns.findIndex(col => col.id === overColumnId);

        return arrayMove(columns, activeColumnIndex, overColumnIndex);              //to swap the ActiveColumnIndex with the OverColumIndex inside the array "columns" and return the array
        })
    }

    function onDragOver(event: DragOverEvent ){
        const {active, over} = event;
        if(!over) return;       
        const activeId = active.id;        
        const overId = over.id;           
        
        if(activeId === overId)  return;  

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if(!isActiveATask)  return;

        //First scenario: I'm dropping a TASK over another TASK

        if(isActiveATask && isOverATask){
            setTasks((tasks) => {
                const activeIndex = tasks.findIndex((t) => t.id === activeId);
                const overIndex = tasks.findIndex((t) => t.id === overId);

                if(tasks[activeIndex].columnId !== tasks[overIndex].columnId){          //if i'm dropping a TASK over another column's TASK
                    tasks[activeIndex].columnId =tasks[overIndex].columnId;
                }

                return arrayMove(tasks, activeIndex, overIndex);            //return the Array tasks, with a change: swapping "ActiveIndex" with "OverIndex"
            
            
            })

        }

        //Second scenario: I'm dropping a TASK over a COLUMN(empty)
        const isOverAColumn = over.data.current?.type === "Column";

        if (isActiveATask && isOverAColumn) {
            setTasks((tasks) => {
              const activeIndex = tasks.findIndex((t) => t.id === activeId);
      
              tasks[activeIndex].columnId = overId;
              console.log("DROPPING TASK OVER COLUMN", { activeIndex });
              return arrayMove(tasks, activeIndex, activeIndex);                
            });
          }
        
    }


}



function generateId() {
    /*Generate a random number between 0 and 10000*/
    return Math.floor(Math.random() * 10001);
}


export default KanbanBoard;