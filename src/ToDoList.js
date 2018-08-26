import React from 'react'
import { NEW, COMPLETE } from './common/constants/status';
import InlineEditableText from './InlineEditableText';

export default function ToDoList(
    { 
        todos, 
        onChange, 
        onSubmit,
        onEditComplete
    }) {

    return (
        <div>
            <div className='mt-5'>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="toDoInput" className='text-info'>Enter a to-do...</label>
                        <input type="text" className="form-control" id="toDoInput" />
                    </div>
                    <button type="submit" className="btn btn-info">Add To-do</button>
                </form>
            </div>
            <div className='mt-2'>
                <ul className="list-group">
                    {
                        todos
                            .sort((a, b) => {
                                if (a.status < b.status) {
                                    return -1;
                                }
                                if (a.status > b.status) {
                                    return 1
                                }
                                return 0;
                            })
                            .map((todo, index) => {
                                const statusClass = todo.status === COMPLETE ? 'completedToDo' : 'newToDo';
                                return <li key={index} 
                                            className={`list-group-item d-flex bd-highlight mt-2 ${statusClass}`}>
                                    <div className='p-2 bd-highlight'>
                                        <input type="checkbox" id='todoToggle' 
                                            onChange={onChange} 
                                            value={index} 
                                            checked={todo.status === 2}>
                                        </input>
                                    </div>
                                    <div className="p-2 bd-highlight">
                                        {/* {todo.description} */}
                                        <InlineEditableText 
                                            id={index}
                                            text={todo.description}
                                            onEditComplete={onEditComplete}

                                        />
                                    </div>
                                    <div className="ml-auto p-2 bd-highlight">
                                        <span className='badge badge-info badge-pill'>
                                            {todo.status === NEW ? 'new' : 'complete'}
                                        </span>
                                    </div>
                                </li>
                            })
                    }
                </ul>
            </div>
        </div>
    );
};