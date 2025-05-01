import { BrowserRouter as Router,Routes,Route } from "react-router";
import React from "react";

import My_library from "./pages/My_library";

function App() {
    return(
      <Router>
        <Routes>
          <Route path="/" element={<My_library/>}/>
        </Routes>
      </Router>
    )
}

export default App
