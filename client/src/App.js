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
import Movies from './pages/Movies'
import Series from './pages/Series'
import DetailMovie from './pages/DetailMovie'
import DetailSerie from './pages/DetailSerie'
import AddMovie from './pages/AddMovie'
import EditMovie from './pages/EditMovie'
import Favorites from './pages/Favorites'


function App() {
  return (
    <Router>
      <ApolloProvider client={client}>
        <div className="App container-fluid bg-dark">
          <nav className="navbar navbar-expand-lg navbar color-bg">
            <h3 className="navbar-brand text-light">SMDb</h3>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <Link to="/" className="nav-link text-light">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/movies" className="nav-link text-light">Movies</Link>
              </li>
              <li className="nav-item">
                <Link to="/movies/create" className="nav-link text-light">Add Movie</Link>
              </li>
              <li className="nav-item">
                <Link to="/series" className="nav-link text-light">Series</Link>
              </li>
              <li className="nav-item">
                <Link to="/favorites" className="nav-link text-light">Favorites</Link>
              </li>
            </ul>
          </nav>
          <Switch>
            <Route path="/movies/edit/:id">
              <EditMovie></EditMovie>
            </Route>
            <Route path="/movies/create">
              <AddMovie></AddMovie>
            </Route>
            <Route path="/movies/:id">
              <DetailMovie></DetailMovie>
            </Route>
            <Route path="/movies">
              <Movies></Movies>
            </Route>
            <Route path="/series/:id">
              <DetailSerie></DetailSerie>
            </Route>
            <Route path="/series">
              <Series></Series>
            </Route>
            <Route path="/favorites">
              <Favorites></Favorites>
            </Route>
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
