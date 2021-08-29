import moment from "moment";
import { doEdit } from "./events";

export const getIdFromText = (text) => {
    let id = []

    for (let char of text) {
        if (!isNaN(+char)) {
            id.push(char)
        }
    }

    return id.join('')
}

export const createColumnField = (user , content , columnTitle) => {
    let columnElem = document.getElementById ( columnTitle )
    const spanElem = document.createElement ( 'span' )

    spanElem.className = 'table__content__field'
    spanElem.id = `${ columnTitle }${ user.id }`
    spanElem.innerText = content;

    columnElem.append ( spanElem )
}

export const sortById = (column, idArray) => {
    let sortedData = Array.from(column.querySelectorAll('span')).slice(1).sort((elem1, elem2) => {
        return idArray.indexOf(getIdFromText(elem1.id)) - idArray.indexOf(getIdFromText(elem2.id))
    })
    column.append(...sortedData)
}

export const sortByValue = (value) => {
    const isSortByDate = value === 'date'
    let column = document.getElementById(value)

    let idsArray = []

    let sortedData = Array.from(column.querySelectorAll('span'))
        .slice(1)
        .sort((field1, field2) => {
            if(isSortByDate){
                return moment(field1.innerHTML, 'DD.MM.YYYY') - moment(field2.innerHTML, 'DD.MM.YYYY');
            }else{
                return field1.innerHTML.toLowerCase () > field2.innerHTML.toLowerCase () ? 1 : -1
            }
        })

    for(const elem of sortedData){
        idsArray.push(getIdFromText(elem.id))
    }
    column.append(...sortedData)

    return idsArray
}

export const createButton = (user, textId, callbackFn) => {
    let btn = document.createElement ( 'button' )

    btn.className = 'table__content__column__actions__btn'
    btn.type = 'button'
    btn.id = `${textId}${ user.id }`

    btn.addEventListener ( 'click' , (e) => callbackFn ( e , user ) )

    return btn
}