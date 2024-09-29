import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { url } from "../App";

interface Album {
  _id: string;
  name: string;
  desc: string;
  image: string;
  bgColour: string;
}

interface FetchAlbumsResponse {
  success: boolean;
  albums: Album[];
}

interface RemoveAlbumResponse {
  success: boolean;
  message: string;
}

const ListAlbum = () => {
  const [data, setData] = useState<Album[]>([]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get<FetchAlbumsResponse>(
        `${url}/api/album/list`
      );
      if (response.data.success) {
        setData(response.data.albums);
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  useEffect(() => {
    fetchAlbums();
  }, []);

  const removeAlbum = async (id: string) => {
    try {
      const response = await axios.post<RemoveAlbumResponse>(
        `${url}/api/album/remove`,
        { id }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        fetchAlbums();
      }
    } catch (error) {
      toast.error("Error occurred");
    }
  };

  return <div>
    <p>List of Albums</p>
    <br />
    <div>
    <div className="sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100">
      <b>Image</b>
      <b>Name</b>
      <b>Description</b>
      <b>Album Colour</b>
      <b>Action</b>
    </div>

    {data.map((item, index) => (
      <div
        key={index}
        className="grid grid-cols-[_1fr_1fr_1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5"
      >
        <img className="w-12" src={item.image} alt="" />
        <p>{item.name}</p>
        <p>{item.desc}</p>
        <input type="color" value={item.bgColour} />
        <button
          className="text-red-500"
          onClick={() => removeAlbum(item._id)}
        >
          Remove
        </button>
      </div>
    ))}

    </div>

  </div>;
};

export default ListAlbum;
