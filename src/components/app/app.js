import React, {useState, useEffect, Component} from 'react';
import Table from '../table/';
import Loader from '../loader';
import TableItemDetail from '../tableItemDetail';
import DataSelector from '../dataSelector';
import TableSearch from '../tableSearch';
import Pagination from '../pagination'

import './app.css'



class App extends Component{
  state = {
    isDataSelected: false,
    data: [],
    search: '',
    title: [],
    sort: 'asc', //desc
    sortField: 'Name',
    isLoading: false,
    tableItem: null,
    currentPage: '', // массив из N-ого количества постов
    currentPageNumber: 1, // номер страницы
    postsPerPage: 8 // сколько постов на странице
  }
/*
  componentWillMount() {
    localStorage.getItem('data') && this.setState({
      data: JSON.parse(localStorage.getItem('data'))
    })
  }
  */

  async fetchData(url) {
    
    const response = await fetch(url)
    let data = await response.json()
    // работа с сохранением данных в localStorage
    //const data = (!localStorage.getItem('data')) ? await response.json() : await JSON.parse(localStorage.getItem('data'))
    const title = this.getTitles(data)
    const currentPageNumber = this.state.currentPageNumber
    const currentPage = this.getCurrentPage(data, currentPageNumber)
    console.log(currentPage)
    //data = this.onSort('desc')
    this.setState({
      data,
      title,
      isLoading: false,
      currentPage
    })
}

onSort = (sortField) => {
  const cloned = this.state.data.concat()
  const sortType = this.state.sort === 'asc' ? 'desc' : 'asc'
  const orderedData = cloned.sort(
      (a, b) => {

        if (sortType === 'desc') {
            if (a[sortField].toLowerCase() > b[sortField].toLowerCase()) {
              return 1;
            }
            if (a[sortField].toLowerCase() < b[sortField].toLowerCase()) {
              return -1;
            }
          return 0;
        } else {
          if (a[sortField].toLowerCase() < b[sortField].toLowerCase()) {
            return 1;
          }
          if (a[sortField].toLowerCase() > b[sortField].toLowerCase()) {
            return -1;
          }
        return 0;
        }   
      },
  )
    this.setState({
      data: orderedData,
      sort: sortType,
      sortField
    })
}
getTitles(data) {
    let a = 0
    let number = 0
    for (let i = 0; i < Object.keys(data).length; i++) {
      if (Object.keys(data[i]).length > a) {
        number = i
        a = Object.keys(data[i]).length
      }
    }
    let title = Object.keys(data[number])
    title.length = 5
    return title
}
/*получение нужного количества страниц */
getCurrentPage(data, currentPageNumber) {
      const postsPerPage = this.state.postsPerPage // получаем количество постов на странице
      const indexOfLastPost = currentPageNumber * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      data = data.slice(indexOfFirstPost, indexOfLastPost) // получаем нужные 5 страниц 
      console.log(data)
      return data
}

paginate = (currentPageNumber) => {
  //getCurrentPage(this.state.data, pageNumber)
  const postsPerPage = this.state.postsPerPage // получаем количество постов на странице
  const indexOfLastPost = currentPageNumber * postsPerPage;
      const indexOfFirstPost = indexOfLastPost - postsPerPage;
      let data = this.state.data
      data = data.slice(indexOfFirstPost, indexOfLastPost) // получаем нужные 5 страниц 
  
  console.log(data)
  
  this.setState({
    currentPage: data
  })
  
}

/* сохранение состояния в Localstorage
componentWillUpdate(nextProps, nextState) {
  localStorage.setItem('data', JSON.stringify(nextState.data));
  localStorage.setItem('dataDate', Date.now());
}
*/


onTableItemSelect = (tableItem) => {
  this.setState({tableItem})
}

modeBase = (url) => {
  this.setState({
    isDataSelected: true,
    isLoading: true
  })
  this.fetchData(url)
}

search = (search) => {
  console.log(search)
  const cloned = this.state.data.concat()
  if(!search) {
    return cloned
  }
  const filteredData = cloned.filter(item => {
    return item['firstName'].toLowerCase().includes(search.toLowerCase())
        || item['lastName'].toLowerCase().includes(search.toLowerCase())
        || item['email'].toLowerCase().includes(search.toLowerCase())
  })

  this.setState({
    data: filteredData
  })
}

  
render() {
  
 
    if (!this.state.isDataSelected) {
      return (
        <div className="container">
          <DataSelector onSelect = {this.modeBase}/>
        </div>
      )
    }
    return (
      <div className="App">
        {this.state.isLoading 
          ? <Loader></Loader> 
          : <React.Fragment>
              <TableSearch 
                  onSearch = {this.search}/>
                {
                this.state.tableItem
                ? <TableItemDetail  
                    info = {this.state.tableItem}
                    onTableItemSelect = {this.onTableItemSelect}/>
                : null 
              }
                <Table 
                  //data = {this.state.data}
                  data = {this.state.currentPage}
                  title = {this.state.title}
                  onSort = {this.onSort}
                  sort = {this.state.sort}
                  sortField = {this.state.sortField}
                  onTableItemSelect = {this.onTableItemSelect}
                >
                </Table>
                <Pagination 
                  postsPerPage = {this.state.postsPerPage}
                  totalPosts = {this.state.data.length}
                  paginate = {this.paginate}
                />
               
            </React.Fragment>

        }
        
      </div>
    );
  }
}


export default App;
