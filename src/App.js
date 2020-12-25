import React, { useState, useEffect } from "react";
import AddBand from "./components/AddBand";
import BandList from "./components/BandList";
import { useSocket } from "./hooks/useSocket";
import "./App.css";

function App() {
  const [bands, setBands] = useState([]);
  const { socket, online } = useSocket("http://localhost:8080");

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
  });

  const toVote = (id) => {
    console.log("id", id);
    socket.emit("vote-band", id);
  };

  const deleteBand = (id) => {
    socket.emit("delete-band", id);
  };

  const changeBandName = (id, name) => {
    socket.emit("change-name", { id, name });
  };

  const addBand = (band) => {
    socket.emit("add-band", { band });
  };

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service status:
          {online ? (
            <span className="text-success">Online</span>
          ) : (
            <span className="text-danger">Offline</span>
          )}
        </p>
      </div>

      <h1>BandNames</h1>
      <hr />

      <div className="row">
        <div className="col-8">
          <BandList
            bands={bands}
            toVote={toVote}
            deleteBand={deleteBand}
            changeBandName={changeBandName}
          />
        </div>
        <div className="col-4">
          <AddBand addBand={addBand} />
        </div>
      </div>
    </div>
  );
}

export default App;
