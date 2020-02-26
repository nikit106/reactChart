import React, {Component} from 'react';
import Table from '../table/';
import Loader from '../loader';
import TableItemDetail from '../tableItemDetail';
import DataSelector from '../dataSelector';
import TableSearch from '../tableSearch';

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
    tableItem: null
  }
/*
  componentWillMount() {
    localStorage.getItem('data') && this.setState({
      data: JSON.parse(localStorage.getItem('data'))
    })
  }
  */

  async fetchData(url) {
    
    const response = await fetch(url) // тест
    const data = await response.json()
    // работа с сохранением данных в localStorage
    //const data = (!localStorage.getItem('data')) ? await response.json() : await JSON.parse(localStorage.getItem('data'))
    const title = this.getTitles(data)
    //data = this.onSort('desc')

    this.setState({
      data,
      title,
      isLoading: false
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
        {this.state.isLoading ? <Loader></Loader> : 
        <React.Fragment>
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
            data = {this.state.data}
            title = {this.state.title}
            onSort = {this.onSort}
            sort = {this.state.sort}
            sortField = {this.state.sortField}
            onTableItemSelect = {this.onTableItemSelect}
          >
          </Table>
        </React.Fragment>
        }
        
      </div>
    );
  }
}


export default App;
