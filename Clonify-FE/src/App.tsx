import React, { useContext } from "react";
import Sidebar from "./components/Sidebar";
import Player from "./components/Player";
import Display from "./components/Display";
import { PlayerContext } from "./context/PlayerContext";

const App: React.FC = () => {
  const playerContext = useContext(PlayerContext);

  if (!playerContext) {
    throw new Error(
      "PlayerContext must be used within a PlayerContextProvider",
    );
  }

  const { audioRef, track, songsData } = playerContext;

  return (
    <div className="h-screen bg-black">
      {songsData.length !== 0 ? (
        <>
          <div className="h-[90%] flex">
            <Sidebar />
            <Display />
          </div>
          <Player />
        </>
      ) : null}
      <audio ref={audioRef} src={track ? track.file : ""} preload="auto" />
    </div>
  );
};

export default App;
