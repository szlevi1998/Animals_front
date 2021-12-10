import React from 'react';
import history from './../history'

import '../style/AnimalTable.css'

export default class AnimalTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      animals: [{}]
    };
  }

  componentDidMount() {
    fetch('http://localhost:8080/animal', {
      method: 'GET'
    })
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          animals: responseData
        })
      }).catch(function() {
        console.error('Error fetching all animals from database!')
      })
  }

  deleteAnimal(id, animalName) {
    if (window.confirm('Are you sure you want to delete ' + animalName + '?')) {
      fetch('http://localhost:8080/animal/' + id, {
        method: 'DELETE',
      }).then(response => {
        if (response.ok) {
          console.log('Animal with id: ' + id + ' successfully deleted from the database');
          window.location.reload();
        } else {
          console.error('Error deleting animal with ' + animalName + ' name and ' + id + ' id!')
        }
      })
    }
  }

  renderTableHeader() {
    let header = Object.keys(this.state.animals[0])
    return header.map((key, index) => {
      return <th key={index}>{key.toUpperCase()}</th>
    })
  }

  renderTableData() {
    return this.state.animals.map((animal, index) => {
      const { id, name, height, weight, animalClass } = animal
      return (
        <tr key={index}>
          <td>{id}</td>
          <td>{name}</td>
          <td>{height}</td>
          <td>{weight}</td>
          <td>{animalClass}</td>
          <td>
            <button className='btn btn-outline-success mr-4' onClick={() => history.push({
              pathname: '/editAnimal/' + id,
              state: {
                animal: animal
              }
              })}>Edit</button>
            <button className='btn btn-outline-danger' onClick={() => this.deleteAnimal(id, name)}>Delete</button>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <table id='animals'>
          <tbody>
            <tr>
              {this.renderTableHeader()}
              <th>Edit/Delete</th>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>

    );
  }

}