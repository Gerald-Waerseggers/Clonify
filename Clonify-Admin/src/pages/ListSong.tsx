import React, { useEffect, useState } from "react";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

interface Song {
  _id: string;
  image: string;
  name: string;
  album: string;
  duration: string;
}

interface FetchSongsResponse {
  success: boolean;
  songs: Song[];
}

interface RemoveSongResponse {
  success: boolean;
  message: string;
}

const ListSong: React.FC = () => {
  const [data, setData] = useState<Song[]>([]);

  const fetchSongs = async () => {
    try {
      const response = await axios.get<FetchSongsResponse>(
        `${url}/api/song/list`,
      );
      if (response.data.success) {
        setData(response.data.songs);
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  const removeSong = async (id: string) => {
    try {
      const response = await axios.post<RemoveSongResponse>(
        `${url}/api/song/remove`,
        { id },
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchSongs();
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  useEffect(() => {
    fetchSongs();
  }, []);

  return (
    <div>
      <p>All songs List</p>
      <br />
      <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
        <b>Image</b>
        <b>Name</b>
        <b>Album</b>
        <b>Duration</b>
        <b>Action</b>
      </div>
      {data.map((item) => (
        <div
          key={item._id}
          className="grid grid-cols-[1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
        >
          <img src={item.image} alt={item.name} className="w-12" />
          <p>{item.name}</p>
          <p>{item.album}</p>
          <p>{item.duration}</p>
          <button
            className="text-red-500 font-bold"
            onClick={() => removeSong(item._id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default ListSong;
