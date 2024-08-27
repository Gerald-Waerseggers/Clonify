import React, {
  createContext,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";
import { songsData } from "../assets/assets";

interface PlayerContextProviderProps {
  children: ReactNode;
  // Add other props here if needed
}

export const PlayerContext = createContext();

const PlayerContextProvider: React.FC<PlayerContextProviderProps> = (props) => {
  const { children } = props;

  const audioRef = useRef();
  const seekBg = useRef();
  const seekBar = useRef();

  const [track, setTrack] = useState(songsData[1]);
  const [playStatus, setPLayStatus] = useState(false);
  const [time, setTime] = useState({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    audioRef.current.play();
    setPLayStatus(true);
  };

  const pause = () => {
    audioRef.current.pause();
    setPLayStatus(false);
  };

  const playWithId = async (id: number) => {
    await setTrack(songsData[id]);
    await audioRef.current.play();
    setPLayStatus(true);
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      await audioRef.current.play();
      setPLayStatus(true);
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      await audioRef.current.play();
      setPLayStatus(true);
    }
  };

  const seekSong = async (e) => {
    const percentage = e.nativeEvent.offsetX / seekBg.current.offsetWidth;
    audioRef.current.currentTime = audioRef.current.duration * percentage;
  };

  useEffect(() => {
    setTimeout(() => {
      audioRef.current.ontimeupdate = () => {
        seekBar.current.style.width = `${
          (audioRef.current.currentTime / audioRef.current.duration) * 100
        }%`;

        setTime({
          currentTime: {
            second: Math.floor(audioRef.current.currentTime % 60),
            minute: Math.floor(audioRef.current.currentTime / 60),
          },
          totalTime: {
            second: Math.floor(audioRef.current.duration % 60),
            minute: Math.floor(audioRef.current.duration / 60),
          },
        });
      };
    });
  }, [audioRef]);

  const contextValue = {
    audioRef,
    seekBg,
    seekBar,
    track,
    setTrack,
    playStatus,
    setPLayStatus,
    time,
    setTime,
    play,
    pause,
    playWithId,
    previous,
    next,
    seekSong,
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export default PlayerContextProvider;
