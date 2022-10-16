import React from "react";
const Card = ({item})=>{
    const myRef = React.useRef();
    const [isDrag, setDrag] = React.useState(false)
    const [startDrag, setStartDrag] = React.useState(0)
    const [endDrag, setEndDrag] = React.useState(0)
    const [position, setPosition]= React.useState({
        x: 0,
        y: 0
    })
    const handleMouseDown = (e) =>{
        console.log("MASUK KE SINI",myRef.current.offsetLeft)
        setDrag(true)
        setStartDrag(e.pageX)
        setPosition({
            x:  myRef.current.offsetLeft,
            y:  myRef.current.offsetTop
        })
    }
    const handleMouseUp = (e)=>{
        console.log("asda")
        setEndDrag(e.pageX)
        setDrag(false)
        console.log(startDrag, "---", endDrag)
    }
    const handleMouseMove = (e)=>{
       
        if(isDrag === true){
            console.log(isDrag)
            console.log(e.pageX, "----", e.pageY)
            setPosition({
                x: myRef.current.offsetLeft,
                y:  myRef.current.offsetTop
            })
        }
    }
    return <div ref={myRef}style={{position: isDrag ? "absolute" : "unset", top: position.y, left: position.x}}  onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} className="box-list">
    {item.content}
        </div>
}
const Board =  ({todo = []}) => {
    return(
        <div className="box">
            {todo.filter(item => item.status === 1).map((item, key) =>{
                return <Card item={item} key={key}/>
            } )}
            

        </div>
    )
}
export default Board;