import React, { Component } from 'react';
import { Fzf } from 'fzf'
import Menu from './menu.js';
import Users from './users.js';

export default class UsersPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      usersGroup: [{
        "CEO": [],
        "Managers": [],
        "Financial": [],
        "Sales": [],
        "Design": []
      }],
      usersShow: null,
      usersGroupShow: [{
        "CEO": [],
        "Managers": [],
        "Financial": [],
        "Sales": [],
        "Design": []
      }],
      view: 'list',
      sort: 'name'
    }
  }

  componentDidMount() {
    fetch('https://gimatutdinova.github.io/users/users.json')
      .then(response => response.json())
      .then(commits => {
        this.setState({
          users: commits.map(item => item),
          usersShow: commits.map(item => item)
        })
        this.groupSort(commits)
      })
  }

  // Функция для сортировки пользователей по группам
  groupSort = (arr) => {
    for (let i = 0; i != arr.length; i++) {
      if (arr[i].position == '-') {
        continue
      }
      let j = arr[i].position
      this.state.usersGroup[0][j].push(arr[i])
      this.state.usersGroupShow[0][j].push(arr[i])
    }
  }

  // Функция для смены вида отображения пользователей

  getView = (id) => {
    this.setState({view: id});
  }

  // Функция для сортировки пользователей
  getSort = (id) => {
    if (this.state.view == 'group') {
      let arr = this.state.usersGroup;
      for (let group in arr[0]) {     
        arr[0][group].sort(function(a, b) {
            return (a[id] < b[id]) ? -1 : (a[id] > b[id]) ? 1 : 0;
        }); 
      }
      this.setState({ usersGroupShow: arr })
    } else {
      let arr = this.state.users
      arr.sort(function(a, b) {
          return (a[id] < b[id]) ? -1 : (a[id] > b[id]) ? 1 : 0;
      });
      this.setState({ usersShow: arr })
    }
  }

  // Функция для поиска пользователей
  search = (input) => {
    if (this.state.view == 'group') {
      let arr_group = JSON.parse(JSON.stringify(this.state.usersGroup));
      for (let group in arr_group[0]) {    
        const fzf = new Fzf(arr_group[0][group], {
          selector: (item) => /\d/.test(input) ? item.phone : item.name,
        });
        let arr = [];
        const entries = fzf.find(input)
        entries.forEach(entry => arr.push(entry.item));
        arr_group[0][group] = arr;
      } 
      this.setState({ usersGroupShow: arr_group })
    } else {
      this.state.usersShow = this.state.users;
      const fzf = new Fzf(this.state.usersShow, {
        selector: (item) => /\d/.test(input) ? item.phone : item.name,
      });
      let arr = [];
      const entries = fzf.find(input)
      entries.forEach(entry => arr.push(entry.item))
      this.setState({ usersShow: arr })
    }
  }
  
  render() {
      return (
        <div className='main__conteiner'>
          <Menu getView = {this.getView} getSort = {this.getSort} search = {this.search}/>
          <Users users = {this.state.usersShow} usersGroup ={this.state.usersGroupShow[0]} view = {this.state.view}/>
        </div>
      )
  }
} 