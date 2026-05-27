import React from "react";
import IssueFilter from "./Components/IssueFilter";
import IssueAdd from "./Components/IssueAdd";
import IssueList from "./Components/IssueList";
import IssueTable from "./Components/IssueTable";

function App() {
  return (
    <div className="App">
      <IssueList/>
      <IssueTable/>git
      <IssueFilter />
      <IssueAdd />
    </div>
  );
}

export default App;