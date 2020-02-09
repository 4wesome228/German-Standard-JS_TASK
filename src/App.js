import React from "react";
import { ServiceProvider } from "./service/service-context";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import { MusicService } from "./service/musicService";
import Routes from "./routes";

function App() {
  const musicService = new MusicService();
  return (
    <Router>
      <div className="container">
        <ServiceProvider value={musicService}>
          <Routes />
        </ServiceProvider>
      </div>
    </Router>
  );
}

export default App;
