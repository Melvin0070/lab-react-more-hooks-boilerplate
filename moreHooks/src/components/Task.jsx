import React, { useReducer, useRef } from 'react'

const reducer = (state, action) => {
    switch (action.type) {
        case 'add':
            return [...state, {id: Date.now(),task :action.payload, isVisible: true}];
        case 'toggle':
            return state.map((ele) => {
                return ele.id === action.payload ? {...ele, isVisible: !ele.isVisible} : ele;
            })
        default:
            return state;
    }

    
}

function TaskList() {
    const inputRef = useRef(null)
    const [state, dispatch] = useReducer(reducer, []);
    const addTask = (e) => { 
        if(e.key === 'Enter'){
            dispatch({type: 'add', payload: e.target.value})
            inputRef.current.value = ''
        }

    }
    const scrollToTop = () => {
        window.scrollTo({top:0, behavior:'smooth'})
        inputRef.current.focus()

    }
    const toggleTask = (taskId) => {
        dispatch({type: 'toggle', payload: taskId})

    }
  return (
    <div>
        <div><input type="text" ref={inputRef} onKeyDown={(e)=>addTask(e)}/></div>
        <div>
            {
            state.map((ele) => {
                return <li key={ele.id}>
                    {
                        ele.isVisible ? <div>{ele.task} <button onClick={() => toggleTask(ele.id)}>Hide</button></div> : <div>
                            The Content is Hidden
                            <button onClick={()=>toggleTask(ele.id)}>Show</button>
                        </div>
                    }
                </li>
})}
        <button onClick={scrollToTop}>Scroll to top</button>

        </div>
    </div>
  )
}

export default TaskList
