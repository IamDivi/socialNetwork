import React, { useState } from 'react'

import style from "./Paginator.module.css"

type propsType = {
    totalCount:number
    pageSize:number
    portionSize?:number
    onPageChanged:(pageNumber:number)=>void
    currentPage:number
    
}

const Paginator: React.FC<propsType> = ({totalCount, pageSize, portionSize, onPageChanged, currentPage})=> {
    let pagesCount = Math.ceil(totalCount / pageSize)
    let pages = []
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount/portionSize)
    let [portionNumber, setPortionNumber] = useState(1)
    let leftPortionPageNumber = (portionNumber-1)*portionSize+1
    let rightPortionPageNumber = portionNumber*portionSize  
    return <div>
        {portionNumber > 1 &&
        <button onClick={() => {setPortionNumber(portionNumber-1)}}>PREV</button> }
        {pages.filter(p => p >=leftPortionPageNumber && p<=rightPortionPageNumber)
        .map((p) => {
            return <span className={currentPage === p && style.selectedPage}
                onClick={() => { onPageChanged(p) }} >{p}</span>
        })}
        {portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber+1)}} >NEXT</button> }
    </div>

}

export default Paginator