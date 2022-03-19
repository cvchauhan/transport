import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import "./App.css";
import Sidebar from './components/sidebar/Sidebar';
import { HashRouter as Router} from 'react-router-dom';


function App() {
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