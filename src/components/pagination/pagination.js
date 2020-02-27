import React from 'react'

import './pagination.css'


export default ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    console.log('postsPerPage' + postsPerPage)
    console.log('totalPosts' + totalPosts)
    for (let i = 1; i<= Math.ceil(totalPosts / postsPerPage); i++) {
        pageNumbers.push(i)
    }

    return (
        <div>
            <ul className = "pagination">
                {pageNumbers.map(number => (
                    <li key = {number} className = "pagination__item">
                        <a onClick = {() => paginate(number)} href = "!#" className = "pagination__button">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}
