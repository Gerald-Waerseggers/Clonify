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
}

interface Time {
  currentTime: { second: number; minute: number };
  totalTime: { second: number; minute: number };
}

interface Track {
  id: number;
  name: string;
  desc: string;
  image: string;
  file: string;
}

interface PlayerContextProps {
  audioRef: React.RefObject<HTMLAudioElement>;
  seekBg: React.RefObject<HTMLDivElement>;
  seekBar: React.RefObject<HTMLHRElement>;
  track: Track;
  setTrack: React.Dispatch<React.SetStateAction<Track>>;
  playStatus: boolean;
  setPLayStatus: React.Dispatch<React.SetStateAction<boolean>>;
  time: Time;
  setTime: React.Dispatch<React.SetStateAction<Time>>;
  play: () => void;
  pause: () => void;
  playWithId: (id: number) => Promise<void>;
  previous: () => Promise<void>;
  next: () => Promise<void>;
  seekSong: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => Promise<void>;
}

export const PlayerContext = createContext<PlayerContextProps | undefined>(
  undefined
);

const PlayerContextProvider: React.FC<PlayerContextProviderProps> = ({
  children,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const seekBg = useRef<HTMLDivElement>(null);
  const seekBar = useRef<HTMLHRElement>(null);

  const [track, setTrack] = useState<Track>(songsData[1]);
  const [playStatus, setPLayStatus] = useState<boolean>(false);
  const [time, setTime] = useState<Time>({
    currentTime: { second: 0, minute: 0 },
    totalTime: { second: 0, minute: 0 },
  });

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setPLayStatus(true);
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setPLayStatus(false);
    }
  };

  const playWithId = async (id: number) => {
    await setTrack(songsData[id]);
    if (audioRef.current) {
      await audioRef.current.play();
      setPLayStatus(true);
    }
  };

  const previous = async () => {
    if (track.id > 0) {
      await setTrack(songsData[track.id - 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPLayStatus(true);
      }
    }
  };

  const next = async () => {
    if (track.id < songsData.length - 1) {
      await setTrack(songsData[track.id + 1]);
      if (audioRef.current) {
        await audioRef.current.play();
        setPLayStatus(true);
      }
    }
  };

  const seekSong = async (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (seekBg.current && audioRef.current) {
      const percentage = e.nativeEvent.offsetX / seekBg.current.offsetWidth;
      audioRef.current.currentTime = audioRef.current.duration * percentage;
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (audioRef.current) {
        audioRef.current.ontimeupdate = () => {
          if (seekBar.current && audioRef.current) {
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
          }
        };
      }
    });
  }, [audioRef]);

  const contextValue: PlayerContextProps = {
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
