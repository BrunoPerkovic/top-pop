import "./App.scss";
import Modal from "./Components/Modal/Modal";
import SongList from "./Components/SongList/SongList";
import { ErrorBoundary } from "./Components/ErrorBoundary/ErrorBoundary";
import React from "react";

function App() {
  return (
    <div className="App">
      <ErrorBoundary>
        <SongList />
        <Modal />
      </ErrorBoundary>
    </div>
  );
}

export default App;
