import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets"; // Adjust the import path accordingly
import Navbar from "./Navbar";
import { PlayerContext } from "../context/PlayerContext";

interface Album {
  id: number;
  name: string;
  image: string;
  desc: string;
  tracks: Track[];
}

interface Track {
  id: string;
  name: string;
  image: string;
  desc: string;
  duration: string;
}
interface DisplayAlbumProps {
  album: Album; // Assuming Album is the type you want to use
}

const DisplayAlbum: React.FC<DisplayAlbumProps> = ({ album }) => {
  const { id } = useParams<{ id: string }>(); // Define the expected type of id
  const [albumData, setAlbumData] = useState<Album | undefined>(undefined);
  const { playWithId, albumsData, songsData } = useContext(PlayerContext);

  useEffect(() => {
    const album = albumsData.find((item: Album) => item._id === id);
    if (album) {
      setAlbumData(album);
    }
  }, [id, albumsData]);

  return albumData ? (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img
          className="w-48 rounded"
          src={albumData.image}
          alt={albumData.name}
        />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-5"
              src={assets.spotify_logo}
              alt=""
            />
            <b> Spotify</b> • 1,000,000 likes • <b>50 songs, </b>
            about 2 hr 30min
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7]">
        <p>
          <b className="mr-4">#</b>Title
        </p>
        <p>Album</p>
        <p>
          <b className="hidden sm:block">Date Added</b>
        </p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData
        .filter((item) => item.album === album.name)
        .map((item, index) => (
          <div
            onClick={() => playWithId(item._id)}
            key={index}
            className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
          >
            <p className="text-white">
              <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
              <img className="inline w-10 e-10 mr-5" src={item.image} alt="" />
              {item.name}
            </p>
            <p className="text-[15px]">{albumData.name}</p>
            <p className="hidden sm:block text-[15px]">5 days ago</p>
            <p className="text-[15px] text-center">{item.duration}</p>
          </div>
        ))}
    </>
  ) : null;
};

export default DisplayAlbum;
