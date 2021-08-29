import API from "./api";

import { getIdFromText , sortById , sortByValue } from "./additional functions";
import { throwUser } from "../index";

export const doSearch = () => {
    const searchedValue = document.getElementById ( 'search' ).value.toLowerCase ()

    let namesColumn = document.getElementById ( 'name' )
    for (let elem of namesColumn.children) {
        if (elem.innerHTML !== 'Name') {
            if (!elem.innerHTML.toLowerCase ().includes ( searchedValue )) {
                const id = getIdFromText ( elem.id )

                elem.classList.add ( 'hide' )
                document.getElementById ( `description${ id }` ).classList.add ( 'hide' )
                document.getElementById ( `date${ id }` ).classList.add ( 'hide' )
                document.getElementById ( `actions${ id }` ).classList.add ( 'hide' )
            }
        }
    }
}

export const doDelete = async (e, user) => {
    let response = await API.deleteUser ( user.id )

    if (response === 'done') {
        let nameDelete = document.getElementById ( `name${ user.id }` )
        let descriptionDelete = document.getElementById ( `description${ user.id }` )
        let dateDelete = document.getElementById ( `date${ user.id }` )
        let editBtnDelete = document.getElementById ( `edit${ user.id }` )
        let deleteBtnDelete = document.getElementById ( `delete${ user.id }` )

        nameDelete.remove ()
        descriptionDelete.remove ()
        dateDelete.remove ()
        editBtnDelete.remove ()
        deleteBtnDelete.remove ()
    }
}

export const onChange = () => {
    if (document.getElementById ( 'search' ).value === '') {

        let namesColumn = document.getElementById ( 'name' )
        for (let elem of namesColumn.children) {
            if (elem.innerHTML !== 'Name') {
                const id = getIdFromText ( elem.id )

                elem.classList.remove ( 'hide' )
                document.getElementById ( `description${ id }` ).classList.remove ( 'hide' )
                document.getElementById ( `date${ id }` ).classList.remove ( 'hide' )
                document.getElementById ( `actions${ id }` ).classList.remove ( 'hide' )
            }
        }
    }
}

export const doEdit = async (e , user) => {
    document.getElementById ( 'form__name' ).value = user.Name
    document.getElementById ( 'form__description' ).value = user.Description
    document.getElementById ( 'form__date' ).value = user.Date

    document.getElementById ( 'popup' ).classList.add ( 'show-popup' )

    document.getElementById ( 'submit' ).onclick = () => onEditSubmit ( {Name: '' , Date: '' , Description: ''} , user.id )

    e.preventDefault ()
}

export const addUser = (e) => {
    document.getElementById ( 'popup' ).classList.add ( 'show-popup' )

    document.getElementById ( 'form__name' ).value = ''
    document.getElementById ( 'form__description' ).value = ''
    document.getElementById ( 'form__date' ).value = ''

    document.getElementById ( 'submit' ).onclick = () => onAddSubmit ( {Name: '' , Date: '' , Description: ''} )

    e.preventDefault ()
}

export const onSortSubmit = (e, form) => {
    e.preventDefault()

    let data = new FormData(form)

    for(const elem of data){
        let value = elem[1]

        const values = ['name', 'description', 'date', 'actions']
        values.splice(values.indexOf(value), 1)

        let idsArray = sortByValue(value)

        for(const valueToSort of values){
            sortById(document.getElementById(valueToSort), idsArray)
        }
    }

    return false
}

const onAddSubmit = async (newUser) => {
    newUser.Name = document.getElementById ( 'form__name' ).value
    newUser.Description = document.getElementById ( 'form__description' ).value
    newUser.Date = document.getElementById ( 'form__date' ).value

    if (newUser.Date !== '' && newUser.Description !== '' && newUser.Name !== '') {
        let data = await API.addUser ( newUser )

        if (data) {
            throwUser ( data )

            document.getElementById ( 'popup' ).classList.remove ( 'show-popup' )
        }
    }
}

const onEditSubmit = async (newUserData , id) => {
    newUserData.Name = document.getElementById ( 'form__name' ).value
    newUserData.Description = document.getElementById ( 'form__description' ).value
    newUserData.Date = document.getElementById ( 'form__date' ).value

    if (newUserData.Date !== '' && newUserData.Description !== '' && newUserData.Name !== '') {
        let data = await API.editUserInfo ( newUserData , id )

        if (data) {
            document.getElementById ( `name${ data.id }` ).innerHTML = data.Name
            document.getElementById ( `description${ data.id }` ).innerHTML = data.Description
            document.getElementById ( `date${ data.id }` ).innerHTML = data.Date

            document.getElementById ( 'popup' ).classList.remove ( 'show-popup' )
        }
    }
}

