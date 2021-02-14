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
        <div className="App">
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
