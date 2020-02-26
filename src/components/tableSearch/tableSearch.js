import React, {useState} from 'react'

import './tableSearch.css'

export default (props) => {

    const [value,setValue] = useState('')

    const valueChange = (event) => {
        setValue(event.target.value)
    }

    return (
        <div class = "search">
            <input
                className = "search__input" 
                type = "text" 
                onChange = {valueChange} 
                value = {value}>
            </input>
            <button
                className = "search__button" 
                onClick = {() => props.onSearch(value)}
                >Поиск
            </button>
        </div>
    )
}