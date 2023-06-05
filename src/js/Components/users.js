import React, { Component } from 'react';

// Компонент для отображения пользователей
class Person extends Component {
    // Функция для выделения пользователей при нажатии на "флажок"
    f = (id) => {
        const user =  document.getElementById(id);
        user.classList.toggle('_active');
    }
    render() {
        return (
            <div className='users'>
                {this.props.users?.map(item => (
                    <div className='user' key={item.id} id={item.id}>
                        <p><input type="checkbox" className='user__checkbox' onChange={() => this.f(item.id)} /></p>
                        <img className='user__photo' src={item.photo} />
                        <p className='user__name'>{item.name}</p>
                        <p className='user__phone'>{item.phone}</p>
                        <p className='user__email'>{item.email}</p>
                        <p className='user__position'>{item.position}</p>
                    </div> 
                ))}
            </div>
        );    
    }
}
export default function Users(props) {
    if (!props.users) {
        return null;
      } else {
        if (props.view == 'list') {
            return (
                <div className='users__list'>
                    <div className='users__list_thead'>
                        <p></p>
                        <p>Имя</p>
                        <p>Телефон</p>
                        <p>Email</p>
                        <p>Группа</p>
                    </div>
        
                    <Person users = {props.users}/>
                </div>
            )
        } else if (props.view == 'card') {
            return (
                <div className='users__card'><Person users = {props.users}/></div>
            )
        } else {
            return (
                <div className='users__group'>
                    <div className='users__group_list'>
                        <p className='users__group_title'>Руководство</p>
                        <Person users = {props.usersGroup['CEO']}/>
                    </div>
                    <div className='users__group_list'>
                        <p className='users__group_title'>Управление</p>
                        <Person users = {props.usersGroup['Managers']}/>
                    </div>
                    <div className='users__group_list'>
                        <p className='users__group_title'>Финансы</p>
                        <Person users = {props.usersGroup['Financial']}/>
                    </div>
                    <div className='users__group_list'>
                        <p className='users__group_title'>Продажи</p>
                        <Person users = {props.usersGroup['Sales']}/>
                    </div>
                    <div className='users__group_list'>
                        <p className='users__group_title'>Дизайн</p>
                        <Person users = {props.usersGroup['Design']}/>
                    </div>
                </div>
            )
        }
    }
}