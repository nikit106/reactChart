import React from 'react'

import './dataSelector.css'


export default props => {
    const smallBase = `http://www.filltext.com/?rows=32&id={number|1000}&firstName={firstName}&lastName={lastName}&email={email}&phone={phone|(xxx)xxx-xx-xx}&address={addressObject}&description={lorem|32}`
    const bigBase = `http://www.filltext.com/?rows=1000&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&address=%7BaddressObject%7D&description=%7Blorem%7C32%7D`
    return (
        <div className = "btnBlock">
            <p class = "text">Выберите размер хранилища</p>
            <button onClick = {() => props.onSelect(smallBase)} className = "btn">Small database</button>
            <button onClick = {() => props.onSelect(bigBase)} className = "btn">Big database</button>
        </div>

    )
}