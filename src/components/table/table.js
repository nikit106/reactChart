import React from 'react'

import './table.css'

import TableItem from '../tableItem'
import Title from '../title/'


export default (props) => (
    <table className = "table">
        <Title
            title = {props.title}
            onSort = {props.onSort}
            sort = {props.sort}
        ></Title>
        <TableItem
            data = {props.data}
            title = {props.title}
            onSort = {props.onSort}
            onTableItemSelect = {props.onTableItemSelect}
        ></TableItem>
            
    </table>
)