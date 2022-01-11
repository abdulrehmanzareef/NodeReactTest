
import './App.css';
import Login from './pages/login';
import ChildScreen from './pages/children';
import ViewCard from './pages/cards';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css'

const Routing = () => {
  return(
    <Switch>
      <Route path='/' exact><Login/></Route>
      <Route path='/children' exact><ChildScreen/></Route>
      <Route path='/child/:id/cards' exact><ViewCard/></Route>
      <Redirect to='/' />
    </Switch>
  )
}
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routing />
      </BrowserRouter>
    </div>
  );
}

export default App;
