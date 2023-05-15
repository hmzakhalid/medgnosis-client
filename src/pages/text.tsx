import React, { useEffect, useState } from "react";

const WebSocketComponent = () => {
  const [messages, setMessages] = useState([]);
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket("ws://localhost:8000/ws");

    websocket.onopen = () => {
      console.log("Connected to websocket");
      setWs(websocket);
    };

    websocket.onmessage = (event) => {
      console.log("Received:", event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    websocket.onerror = (error) => {
      console.log("WebSocket error: ", error);
    };

    websocket.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null);
    };

    return () => {
      if (websocket) {
        websocket.close();
      }
    };
  }, []);

  return (
    <div>
      <h1>WebSocket Output</h1>
      <div>
        {messages.map((message, index) => (
          <p key={index}>
            {message} <br />{" "}
          </p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
