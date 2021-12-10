import React from 'react';
import {Router, Switch, Route, Redirect} from 'react-router-dom';

import NewAnimal from './components/NewAnimal'
import AnimalTable from './components/AnimalTable';
import EditAnimal from './components/EditAnimal'
import history from './history';

export default class Routes extends React.Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/animals" />
                    </Route>
                    <Route path='/animals' exact component={AnimalTable} />
                    <Route path='/newAnimal' component={NewAnimal} />
                    <Route path='/editAnimal/:id' component={EditAnimal} />
                </Switch>
            </Router>
        )
    }
}