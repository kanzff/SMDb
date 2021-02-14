import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom'
import { ApolloProvider } from '@apollo/client'
import client from './config/apolloClient'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App container-fluid bg-dark">
          <nav className="navbar navbar-expand-lg navbar-danger bg-danger">
            <h3 className="navbar-brand">SMDB</h3>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link text-dark">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/movies" className="nav-link text-dark">Movies</Link>
              </li>
              <li className="nav-item">
                <Link to="/series" className="nav-link text-dark">Series</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/">
              <Home></Home>
            </Route>
          </Switch>
        </div>
      </ApolloProvider>
    </Router>
  );
}

export default App;
