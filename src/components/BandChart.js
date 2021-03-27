/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import { graphConfig } from "./graphConfig";
import { Chart } from "chart.js";

const BandChart = () => {
  const { socket } = useContext(SocketContext);

  const { backgroundColor, borderColor, options } = graphConfig;

  useEffect(() => {
    socket.on("current-bands", (bands) => {
      createChart(bands);
    });
  }, [socket]);

  const createChart = (bands = []) => {
    var ctx = document.getElementById("myChart");
    new Chart(ctx, {
      type: "horizontalBar",
      data: {
        labels: bands.map((band) => band.name),
        datasets: [
          {
            label: "# of Votes",
            data: bands.map((band) => band.votes),
            backgroundColor,
            borderColor,
            borderWidth: 1,
          },
        ],
      },
      options,
    });
  };

  return <canvas id="myChart"></canvas>;
};

export default BandChart;
