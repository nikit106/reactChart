import React from 'react'

import './tableItemDetail.css'

export default (props) => (
    
    //{ info } = this.props
    <div className = "tableItemDetails">
        <div class = "tableItemDetails__exit">
            <button onClick = {props.onTableItemSelect.bind(null, null)} className = "tableItemDetails__btn"> X </button>
        </div>
        <div className = "tableItemDetails__text">
            <p>Выбран пользователь <b>{props.info.firstName + ' ' + props.info.lastName}</b></p>
            <p>Описание:   <br/>
                <textarea className = "textarea" defaultValue = {props.info.description} />
            </p>
            <p>Адрес проживания: <b>{props.info.address.streetAddress}</b></p>
            <p>Город: <b>{props.info.address.city}</b></p>
            <p>Провинция/штат: <b>{props.info.address.state}</b></p>
            <p>Индекс: <b>{props.info.address.zip}</b></p>
        </div>
        
        
    </div>
)




