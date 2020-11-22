import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import AddBand from "./components/AddBand";
import BandList from "./components/BandList";
import "./App.css";

const connectSocketServer = () => {
  const socket = io.connect("http://localhost:8080", {
    transports: ["websocket"],
  });
  return socket;
};

function App() {
  const [online, setOnline] = useState(false);
  const [socket] = useState(connectSocketServer());
  const [bands, setBands] = useState([])

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true)
    })
  }, [ socket])

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false)
    })
  }, [ socket])

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      console.log(bands)
      setBands(bands)
    })
  })

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
          />
        </div>
        <div className="col-4">
          <AddBand />
        </div>
      </div>
    </div>
  );
}

export default App;
