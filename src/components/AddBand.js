import React, { useState, useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const AddBand = () => {
  const [band, setBand] = useState("");
  const { socket } = useContext(SocketContext);

  const addBand = (band) => {
    socket.emit("add-band", { band });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (band.trim().length > 0) {
      addBand(band);
      setBand("");
    }
  };
  return (
    <>
      <h3>Add Band</h3>
      <form action="" onSubmit={onSubmit}>
        <input
          type="form-control"
          placeholder="New band name"
          value={band}
          onChange={(e) => setBand(e.target.value)}
        />
      </form>
    </>
  );
};

export default AddBand;
