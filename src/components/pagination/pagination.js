import React from 'react'

import './pagination.css'


export default ({postsPerPage, totalPosts, getCurrentPage}) => {
    const pageNumbers = [];
    for (let i = 1; i<= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    {if (pageNumbers.length > 5) {
        return (
            <div>
                <ul className = "pagination">
                    {pageNumbers.map(number => (
                        <li key = {number} className = "pagination__item">
                            <a onClick = {() => getCurrentPage(number)} href = "!#" className = "pagination__button">
                                {number}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        )
    } else {
        return (
            <div></div>
        )
    }
}
}
