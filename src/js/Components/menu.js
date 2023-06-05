import React, { Component } from 'react';
const icon = document.getElementsByClassName('main__select_buttonIcon');
const items =  document.getElementsByClassName('main__select_items');

// Компонент для отображения кнопок для выбора вида (список, карточки, группы)
function View(props) {
    return (
        <button className="main__view_button" onClick = {() => props.getView(props.id)}>{props.view}</button>
    );
}

// Компонент для отображения кнопок для выбора сортировки  
function Sort(props) {
    return (
        <button className="main__select_item" onClick = {() => props.sortFunction(props.id)} >{props.sort}</button>
    );
}

export default class Menu extends Component {
    // Функция для добавления класса "active" для элементов выпадающего меню 
    active = () => {
        icon[0].classList.toggle('_active');
        items[0].classList.toggle('_active');
    }

    render() {
        return (
            <div className="main__menu">
            <div className="main__view">
                <View view="Список" id="list" getView = {this.props.getView}/>
                <View view="Карточки" id="card" getView = {this.props.getView}/>
                <View view="Группы" id="group" getView = {this.props.getView}/>
            </div>
            <div className="main__select">
                <button className="main__select_button" onClick = {this.active}>
                    <p className="main__select_buttonText">Сортировка</p> 
                    <span className="main__select_buttonIcon"></span>
                </button>
                <div className="main__select_items">
                    <Sort sort="В исходном порядке" sortFunction = {this.props.getSort} id="id"/>
                    <Sort sort="Имя пользователя" sortFunction = {this.props.getSort} id="name"/>
                    <Sort sort="Телефон" sortFunction = {this.props.getSort} id="phone"/>
                    <Sort sort="Email" sortFunction = {this.props.getSort} id="email"/>
                </div>
            </div>
            <div className="main__search">
                <input className="main__search_input" type="text" placeholder="Поиск" onChange={(e) => this.props.search(e.target.value)}/>
                <button className="main__search_button" type="submit"></button>
            </div>
            </div>
        )
    }
}