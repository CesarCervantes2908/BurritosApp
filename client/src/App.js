import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import Inicio from './components/Inicio';
import Gastos from './components/Gastos';
import Pendientes from './components/Pendientes';
import Ventas from './components/Ventas';

const App = () => {
  return (
    <Router>
      <NavBar></NavBar>
        <Switch>
          <Route path="/ventas" component={Ventas} />
          <Route path="/gastos" component={Gastos} />
          <Route path="/pendientes" component={Pendientes} />
          <Route path="/" component={Inicio} />
        </Switch>
    </Router>
  )
}

export default App;