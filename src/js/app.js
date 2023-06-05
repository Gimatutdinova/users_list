import React, { Component } from 'react';
import UsersPage from './Components/usersPage.js'

// Компонент для отображения header
function Header(props) {
  return (
      <div className="header__conteiner">
          <nav className="header__menu">
              <button onClick = {() => props.changeWindow('home')} className="header__link">Home</button>
              <button onClick = {() => props.changeWindow('users')} className="header__link">Users</button>
          </nav>
      </div>
  );
}

// Компонент для отображения footer
function Footer(props) {
    return (
        <div className="footer__conteiner">
            {props.src?.map(item => (
                <img className='footer__icons' src={item} key={item}/>
            ))}
        </div>
    );
}

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
          window: 'home',
          src: ['./img/icons/icons.svg#git', 
            './img/icons/icons.svg#gulp', 
            './img/icons/icons.svg#html',
            './img/icons/icons.svg#js',
            './img/icons/icons.svg#npm',
            './img/icons/icons.svg#react',
            './img/icons/icons.svg#scss',
            './img/icons/icons.svg#webpack',
          ]
        }
    }
    
    render() {
        if (this.state.window == 'home') {
            return (
                <div className="wrapper">
                    <header className="header">
                        <Header changeWindow={this.changeWindow}/>
                    </header>
                    <main className="main">
                        <div className='main__conteiner main__home'>
                            <p className='main__title'>Добро пожаловать<br/>на страницу приветствия!</p>
                            <img className='main__photo' src='./img/home.webp' />
                            <p className='main__text'>Нажмите на кнопку "users", чтобы перейти к странице со списком пользователей.</p>
                        </div>
                    </main>
                    <footer className='footer'>
                        <Footer src={this.state.src} />
                    </footer>
                </div>
            );
        } else return (
            <div className="wrapper">
                <header className="header">
                    <Header changeWindow={this.changeWindow}/>
                </header>
                <main className="main main__users">
                    <UsersPage />
                </main>
            </div>
        );
    }   

    // Функция для смены окон (home, users)
    
    changeWindow = (id) => {
        this.setState({window: id});
    }
}