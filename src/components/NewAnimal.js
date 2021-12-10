import React from 'react';
import history from '../history'

import '../style/NewAnimal.css'

export default class NewAnimal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            animal: {}
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

        fetch('http://localhost:8080/animal', {
            method: 'POST',
            body: JSON.stringify(this.state.animal),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            if (response.ok) {
                console.log('New Animal: ' + this.state.animal.name + ' successfully added to database');
                history.push('/animals')
            } else {
                console.error('Error adding new animal to the database!');
                alert('Animal already exists!');
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
                            required
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('name')}
                            placeholder='Enter the animal name' />
                    </div>
                    <div className='form-group'>
                        <label>Animal Height</label>

                        <input type='number'
                            required
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('height')}
                            placeholder='Enter the animal height' />
                    </div>
                    <div className='form-group'>
                        <label>Animal Weight</label>

                        <input type='number'
                            required
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('weight')}
                            placeholder='Enter the animal weight' />
                    </div>
                    <div className='form-group'>
                        <label>Animal Class</label>

                        <input type='text'
                            required
                            className='form-control form-control-lg'
                            onChange={this.changeAnimal('animalClass')}
                            placeholder='Enter the animal class' />
                    </div>

                    <input className='btn btn-outline-primary btn-lg' type='submit' value='Submit' />
                </form>
            </div>
        );
    }
}
