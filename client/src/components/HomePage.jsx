import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./HomePage.css";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

var serverData = socket.emit("message", [0, 0]);

const HomePage = () => {
  const [startingNumber, setStartingNumber] = useState(serverData[1]);
  const [display, setDisplay] = useState(serverData[0]);

  useEffect(() => {
    serverData = socket.emit("message", [0, 0]);
    setDisplay.setState(serverData[0]);
    setStartingNumber.setState(serverData[1]);
    // console.log(startingNumber);
  }, []);

  return (
    <div>
      <div>
        <h3 className="header">Number Game</h3>
        <h4 className="score">{"Score : " + startingNumber}</h4>
        {
          <div className="display">
            {Array(startingNumber).fill(
              <div className="column">
                <img src="/apple.png" alt="apple" width="100px" />
              </div>
            )}
          </div>
        }

        <h3>Select the number of apples...</h3>
        {
          <div>
            <img
              onClick={() => {
                socket.emit("message", serverData[0][0]);
              }}
              alt="one"
              src={"numbers/" + serverData[0][0] + ".png"}
              width="100"
              height="100"
            />
            <img
              alt="one"
              onClick={() => {
                socket.emit("message", serverData[0][1]);
              }}
              src={"numbers/" + serverData[0][1] + ".png"}
              width="100"
              height="100"
            />
            <img
              alt="one"
              onClick={() => {
                socket.emit("message", serverData[0][2]);
              }}
              src={"numbers/" + serverData[0][2] + ".png"}
              width="100"
              height="100"
            />
          </div>
        }
      </div>
    </div>
  );
};

export default HomePage;
