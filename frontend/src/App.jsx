import React from 'react';
import Home from "./Components/Home";
import Main from "./Components/Main";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <>
        <Router>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/Main" element={<Main />} />
            <Route
              path="*"
              element={<Navigate to="/" />}
            />
          </Routes>
        </Router>
      </>
    </div>
    
    
  );
}

export default App;
