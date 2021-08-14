import './App.css';
import PreLogin from './homecontent/PreLogin';
import Home from './pages/Home';
import Header from './pages/Header';
import Footer from './pages/Footer';
import About from './pages/About';
import MainState from './context_/main/MainState';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastProvider } from "react-toast-notifications";
import Login from './Authentication/Login';
import Register from './Authentication/Register';
import Contect from './pages/Contact';
import Example from './Authentication/test';
import ProjectGrid from './ProjectContent/Project_Body';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.js';
import $ from 'jquery';
import Popper from 'popper.js';
import Project_Update from './ProjectContent/Project_Update';

function App() {
  return (
    <MainState>
      <div>
        <ToastProvider>
          <BrowserRouter>
            <Header />
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
              <Route exact path='/login' component={Login} />
              <Route exacat path='/register' component={Register} />
              <Route exact path='/contact' component={Contect} />
              <Route exact path='/example' component={Example} />
              <Route exact path='/ProjectGrid' component={ProjectGrid} />
              <Route exact path='/Project_Update' component={Project_Update} />
            </Switch>
            <Footer />
          </BrowserRouter>
        </ToastProvider>
      </div>
    </MainState>
  );
}

export default App;
