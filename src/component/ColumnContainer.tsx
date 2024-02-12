import { useSortable } from "@dnd-kit/sortable";
import Trashicon from "../icons/Trashicon";
import { Column, Id } from "../types";
import {CSS} from "@dnd-kit/utilities";

interface Props {
    column: Column;
    deleteColumn: (id: Id)=> void;                  //id (to eliminate) is initialy empty
}

function ColumnContainer(props: Props) {
    const{column, deleteColumn} = props;
    
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
        }
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
        border-rose-500
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
                {column.title}
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
        <div className="flex flex-grow">Content</div>
        
        {/*Column Footer*/}
        <div>Footer</div>
    </div>
      );
}

export default ColumnContainer