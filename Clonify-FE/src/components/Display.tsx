import { useContext, useEffect, useRef } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import { PlayerContext } from "../context/PlayerContext";

// Define necessary interfaces/types
interface Album {
  _id: number;
  name: string;
  image: string;
  desc: string;
  tracks: Track[];
  bgColour: string;
}

interface Track {
  id: string;
  name: string;
  image: string;
  desc: string;
  duration: string;
}

const Display = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    // Handle the case where context is not provided
    throw new Error("PlayerContext must be used within a PlayerContextProvider");
  }

  const { albumsData } = context;
  const displayRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const isAlbum = location.pathname.includes("album");
  const albumId = isAlbum ? location.pathname.split("/").pop() : null;

  // Find the album using `_id` from the URL
  const album = albumsData.find((x: Album) => x._id as unknown as string === albumId);

  // Get bgColour or default to "#121212"
  const bgColor = album ? album.bgColour : "#121212";

  useEffect(() => {
    if (isAlbum) {
      displayRef.current!.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current!.style.background = "#121212";
    }
  });

  return (
    <div
      ref={displayRef}
      className=" w-full m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisplayHome />} />
        <Route path="/album/:id" element={<DisplayAlbum album={album} />} />
      </Routes>
    </div>
  );
};

export default Display;
