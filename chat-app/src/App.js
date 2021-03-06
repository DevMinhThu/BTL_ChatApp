import TextField from "@material-ui/core/TextField";
import React, { useState, useEffect, useRef } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);

  const socketRef = useRef();

  useEffect(() => {
    // * connect to backend
    socketRef.current = io.connect("http://localhost:8080");

    // * listen from client
    socketRef.current.on("message", ({ name, message }) => {
      setChat([...chat, { name, message }]);
    });
  }, [chat]);

  // * handle text change
  const onTextChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  // * render chat
  const renderChat = () => {
    return chat.map(({ name, message }, index) => (
      <div key={index}>
        <h3>
          {name}: <span>{message}</span>
        </h3>
      </div>
    ));
  };

  // * handle submit message
  const onMessageSubmit = (e) => {
    // console.log(e);
    const { name, message } = state;
    socketRef.current.emit("message", { name, message });
    e.preventDefault();
    setState({ message: "", name });
  };

  return (
    <div className="card">
      <form onSubmit={onMessageSubmit}>
        <h1>Chat App</h1>
        <div className="name-field">
          <TextField
            name="name"
            onChange={(e) => onTextChange(e)}
            value={state.name}
            label="Name"
          />
        </div>
        <div>
          <TextField
            name="message"
            onChange={(e) => onTextChange(e)}
            value={state.message}
            id="outlined-multiline-static"
            variant="outlined"
            label="Message"
          />
        </div>
        <button>Send Message</button>
      </form>
      <div className="render-chat">
        <h1>Message</h1>
        {renderChat()}
      </div>
    </div>
  );
}

export default App;
