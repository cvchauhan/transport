import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Sidebar from './components/sidebar/Sidebar';
import { HashRouter as Router} from 'react-router-dom';
import Login from './pages/profile/Login';
import Register from './pages/profile/Register';
import  { Redirect,Route } from 'react-router-dom';

function App() {  
  const isLogin = localStorage.getItem('authToken') && localStorage.getItem('user') ? true : false;
  if (!isLogin) {
    return (
      <Router>
      <div className="App">
      <Redirect to='/login'  />         
      </div>
      <Route path='/login' component={Login} />
      <Route path='/register' component={Register} />      
    </Router>
    )
  }
  return (
    <Router>
      <div className="App">
        <CssBaseline />
          <Sidebar />          
      </div>
    </Router>
  );
}

export default App;