import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { url } from "../App";
import { toast } from "react-toastify";

const AddSong: React.FC = () => {
  // Specify the state types
  const [image, setImage] = useState<File | null>(null);
  const [song, setSong] = useState<File | null>(null);
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [album, setAlbum] = useState<string>("none");
  const [loading, setLoading] = useState<boolean>(false);
  const [albumData, setAlbumData] = useState([]);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const fromData = new FormData();
      fromData.append("name", name);
      fromData.append("desc", desc);
      if (image) fromData.append("image", image);
      if (song) fromData.append("audio", song);
      fromData.append("album", album);

      const response = await axios.post(`${url}/api/song/add`, fromData);
      console.log(response);

      if (response.data.success) {
        toast.success("Song added successfully");
        setName("");
        setDesc("");
        setAlbum("none");
        setImage(null);
        setSong(null);
      } else {
        toast.error("Something went wrong");
        console.log(response.data);
      }
    } catch (error) {
      toast.error("Error occurred");
    }

    setLoading(false);
  };

  return loading ? (
    <div className="grid place-items-center min-h-[80vh]">
      <div className="w-16 h-16 place-self-center border-4 border-gray-400 border-t-green-800 rounded-full animate-spin"></div>
    </div>
  ) : (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-start gap-8 text-gray-800"
      method="post"
      action=""
    >
      <div className="flex gap-8">
        <div className="flex flex-col gap-4">
          <p>Upload Song</p>
          <input
            onChange={(e) => setSong(e.target.files?.[0] ?? null)}
            type="file"
            id="song"
            accept="audio/*"
            hidden
          />
          <label htmlFor="song">
            <img
              src={song ? assets.upload_added : assets.upload_song}
              className="w-24 cursor-pointer"
              alt="Upload song"
            />
          </label>
        </div>
        <div className="flex flex-col gap-4">
          <p>Upload Image</p>
          <input
            onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            type="file"
            id="image"
            accept="image/*"
            hidden
          />
          <label htmlFor="image">
            <img
              src={image ? URL.createObjectURL(image) : assets.upload_area}
              className="w-24 cursor-pointer"
              alt="Upload image"
            />
          </label>
        </div>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Song Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          id="song_name"
          className="bg-transparent outline-green-600 border-2 border-green-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Song Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          value={desc}
          type="text"
          id="song_desc"
          className="bg-transparent outline-green-600 border-2 border-green-400 p-2.5 w-[max(40vw,250px)]"
          placeholder="Type Here"
          required
        />
      </div>
      <div className="flex flex-col gap-2.5">
        <p>Album</p>
        <select
          onChange={(e) => setAlbum(e.target.value)}
          value={album}
          className="bg-transparent outline-green-600 border-2 border-green-400 p-2.5 w-[150px]"
        >
          <option value="none">None</option>
        </select>
      </div>

      <button
        type="submit"
        className="text-base bg-black text-white p-2.5 px-14 cursor-pointer"
      >
        ADD
      </button>
    </form>
  );
};

export default AddSong;
