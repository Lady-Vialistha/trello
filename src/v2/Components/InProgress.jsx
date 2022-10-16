import React from "react";

function Board ({todo = []}){
    return(
        <div className="box">
            {todo.map((item, key) =>{
                return <div id={key} className="box-list">
                {item.content}
                    </div>
            } )}
            

        </div>
    )
}
export default Board;