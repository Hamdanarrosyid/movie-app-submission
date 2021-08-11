import './assets/App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './pages/Home';
import Movies from './pages/Movies';
import Detail from './pages/Detail';
import NotFound from './pages/NotFound';
import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path={'/'} component={Home} />
          <Route path={'/movies/:search'} component={Movies} />
          <Route path={'/detail/:search'} component={Detail} />
          <Route path={'*'} component={NotFound} />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
