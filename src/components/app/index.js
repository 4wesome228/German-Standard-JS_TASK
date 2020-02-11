import React from "react";
import { ServiceProvider } from "../../service/service-context";
import { MusicService } from "../../service/musicService";
import MusicPageContainer from "../../containers/music-page-container";

import "./app.css";

function App() {
  const musicService = new MusicService();
  return (
    <div className="container p-1 background">
      <ServiceProvider value={musicService}>
        <MusicPageContainer />
      </ServiceProvider>
    </div>
  );
}

export default App;
