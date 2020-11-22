import React, { useState, useEffect } from "react";

const BandList = ({ bands: data }) => {
  const [bands, setBands] = useState(data);

  useEffect(() => {
    setBands(data);
  }, [data]);

  const onChangeName = (e, id) => {
    const newName = e.target.value;
    setBands((bands) =>
      bands.map((band) => {
        if (band.id === id) {
          band.name = newName;
        }
        return band;
      })
    );
  };

  const onUnFocus = (id, name) => {};

  const renderTableRows = () => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary">+1</button>
        </td>
        <td>
          <input
            className="form-control"
            value={band.name}
            onChange={(e) => onChangeName(e, band.id)}
            onBlur={() => onUnFocus(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button className="btn btn-danger">Delete</button>
        </td>
      </tr>
    ));
  };
  return (
    <>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Vows</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </>
  );
};

export default BandList;
