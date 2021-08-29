import "./styles/Page.scss";

import API from "./js/api";

import { addUser , doDelete , doEdit , doSearch , onChange , onSortSubmit } from "./js/events";
import { createButton , createColumnField , sortById , sortByValue } from "./js/additional functions";


window.onload = async function () {
    let data = await API.getUsers ()

    for (let user of data) {
        throwUser ( user )
    }
}

export const throwUser = (user) => {
    createColumnField ( user , user.Name , 'name' )
    createColumnField ( user , user.Description , 'description' )
    createColumnField ( user , user.Date , 'date' )

    let iconActions = document.createElement ( 'span' )
    iconActions.className = 'table__content__column__actions'
    iconActions.id = `actions${user.id}`

    let editBtn = createButton(user, `edit`, doEdit)
    editBtn.innerHTML = '<img src="https://img.icons8.com/office/16/000000/edit.png" alt="edit"/>'
    iconActions.append ( editBtn )

    let deleteBtn = createButton(user, `delete`, doDelete)
    deleteBtn.innerHTML = '<img src="https://img.icons8.com/officexs/16/000000/delete-sign.png" alt="delete"/>'
    iconActions.append ( deleteBtn )

    document.getElementById ( 'actions' ).append ( iconActions )
}

document.getElementById ( 'search-btn' ).addEventListener ( 'click' , doSearch )
document.getElementById ( 'search' ).addEventListener ( 'change' , onChange )
document.getElementById ( 'add' ).onclick = (e) => addUser ( e )
document.getElementById ( 'close' ).addEventListener ( 'click' , () => {
    document.getElementById ( 'popup' ).classList.remove ( 'show-popup' )
} )

let form = document.getElementById ( 'sort' )
form.addEventListener('submit', (e) => onSortSubmit(e, form))
