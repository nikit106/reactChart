import React from 'react'

import './tableItem.css'

const TableItem = (props) => {

const tableItem = props.data.map(itemKey => (
    <tr className = "tableTr" key = {itemKey.Name + itemKey.Phone}>
        {props.title.map(itemProperty => {
            return (
                <td key = {itemKey.Name + itemKey[itemProperty]} 
                    className = "tableTd"
                    onClick={props.onTableItemSelect.bind(null, itemKey)}
                >
                    {itemKey[itemProperty]}
                </td>
            )
        })}
    </tr>
))

return (
    <tbody className = "tableTbody">
        { tableItem }
    </tbody>
)
}

export default TableItem