import React, { useState } from "react";

const AddBand = ({ addBand }) => {
  const [band, setBand] = useState("");
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
