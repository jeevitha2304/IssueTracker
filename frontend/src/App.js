import React from "react";
import "./App.css";
import IssueTable from "./Components/IssueTable";
import IssueList from "./Components/IssueList";

function App() {
  return (
    <div className="App">
       <IssueTable/>
      <IssueList/>
      
    </div>
  );
}

export default App;