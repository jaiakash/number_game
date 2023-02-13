import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./HomePage.css";

let endPoint = "http://localhost:5000";
let socket = io.connect(`${endPoint}`);

const HomePage = () => {
  const [messages, setMessages] = useState(["Hello And Welcome"]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    getMessages();
  }, [messages.length]);

  const getMessages = () => {
    socket.on("message", (msg) => {
      //   let allMessages = messages;
      //   allMessages.push(msg);
      //   setMessages(allMessages);
      setMessages([...messages, msg]);
    });
  };

  // On Change
  const onChange = (e) => {
    setMessage(e.target.value);
  };

  // On Click
  const onClick = () => {
    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    } else {
      alert("Please Add A Message");
    }
  };

  return (
    <div>
      <div>
        <h3 className="header">Number Game</h3>
        <h4 className="score">Score : 0</h4>

        <div className="display">
          <div className="column">
            <img src="/apple.png" alt="apple" />
          </div>
        </div>
      </div>
      {messages.length > 0 &&
        messages.map((msg) => (
          <div>
            <p>{msg}</p>
          </div>
        ))}
      <input value={message} name="message" onChange={(e) => onChange(e)} />
      <button onClick={() => onClick()}>Send Message</button>
    </div>
  );
};

export default HomePage;
