import React, {Component} from 'react';
import Table from '../table/';

import './app.css'


class App extends Component{

  state = {
    data: [],
    title: [],
    sort: 'asc', //desc
    sortField: 'Name'
  }

  componentWillMount() {
    localStorage.getItem('data') && this.setState({
      data: JSON.parse(localStorage.getItem('data'))
    })
  }

  async componentDidMount() {
    const response = await fetch(`https://github.com/blmzv/ah-frontend-intern/blob/master/profiles.json`) //правильный
    //const response = await fetch(`https://api.myjson.com/bins/16trcy`) // тест
    const data = (!localStorage.getItem('data')) ? await response.json() : await JSON.parse(localStorage.getItem('data'))
    const title = this.getTitles(data)

    this.setState({
      data,
      title
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
    return title
}

componentWillUpdate(nextProps, nextState) {
  localStorage.setItem('data', JSON.stringify(nextState.data));
  localStorage.setItem('dataDate', Date.now());
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

  
render() {
    return (
      <div className="App">
          <Table 
            data = {this.state.data}
            title = {this.state.title}
            onSort = {this.onSort}
            sort = {this.state.sort}
            sortField = {this.state.sortField}
            >
          </Table>
      </div>
    );
  }
}


export default App;
