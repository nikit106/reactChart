import React from 'react'

import './title.css'

const Title = (props) => {


 const title = props.title.map(item => {
    return (
        <th className = "tableTh" key = {item} onClick = {props.onSort.bind(null, `${item}`)}>{item}
        </th>
    )
})

return (
    <thead className = "tableThread">
        <tr className = "tableTr">
            { title }
        </tr>
    </thead>
   
) 
}
export default Title
