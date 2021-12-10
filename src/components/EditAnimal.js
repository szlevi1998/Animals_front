import React from 'react';
import history from '../history'

import '../style/NewAnimal.css'

export default class EditAnimal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animal: this.props.location.state.animal
        };
        this.changeAnimal = this.changeAnimal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    changeAnimal(name) {
        return event => {
            this.setState(({ animal }) => ({
                animal: { ...animal, [name]: event.target.value }
            }));
        };
    }

    handleSubmit(event) {
        event.preventDefault();

        fetch('http://localhost:8080/animal/' + this.state.animal.id, {
            method: 'PUT',
            body: JSON.stringify(this.state.animal),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('Edited Animal: ' + this.state.animal.name + ' and updated in database');
                history.push('/animals');
            } else {
                console.error('Error updating animal with ' + this.state.animal.id + ' id in the database!');
            }
        })
    }


    render() {
        return (
            <div>
                <form id='animalForm' className='container center_div col-3' onSubmit={this.handleSubmit}>

                    <div className='form-group'>
                        <label>Animal Name</label>

                        <input type='text'
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('name')}
                            value={this.state.animal.name}
                            placeholder='Enter the animal name' />
                    </div>
                    <div className='form-group'>
                        <label>Animal Height</label>

                        <input type='number'
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('height')}
                            value={this.state.animal.height}
                            placeholder='Enter the animal height' />
                    </div>
                    <div className='form-group'>
                        <label>Animal Weight</label>

                        <input type='number'
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('weight')}
                            value={this.state.animal.weight}
                            placeholder='Enter the animal weight' />
                    </div>
                    <div className='form-group'>
                        <label>Animal Class</label>

                        <input type='text'
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('animalClass')}
                            value={this.state.animal.animalClass}
                            placeholder='Enter the animal ability' />
                    </div>

                    <input className='btn btn-outline-success btn-lg' type='submit' value='Update' />
                </form>
            </div>
        );
    }
}
