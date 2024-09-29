import React, { useState } from "react";
import { assets } from "../assets/assets";
import { url } from "../App";
import axios from "axios";
import { toast } from "react-toastify";

const AddAlbum = () => {
  const [image, setImage] = useState<File | null>(null);
  const [colour, setColour] = useState<string>("#FFFFFF");
  const [name, setName] = useState<string>("");
  const [desc, setDesc] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);

    try {
      const fromData = new FormData();
      fromData.append("name", name);
      fromData.append("desc", desc);
      if (image) fromData.append("image", image);
      fromData.append("bgColour", colour);

      const response = await axios.post(`${url}/api/album/add`, fromData);
      console.log(response);

      if (response.data.success) {
        toast.success("Album added successfully");
        setName("");
        setDesc("");
        setColour("#FFFFFF");
        setImage(null);
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
      className=" flex flex-col items-start gap-8 text-gray-600"
    >
      <div className="flex flex-col gap-4">
        <p>Upload Image</p>
        <input
          onChange={(e) => setImage(e.target.files![0])}
          type="file"
          id="image"
          accept="image/*"
          hidden
        />
        <label htmlFor="image">
          <img
            className="w-24 cursor-pointer"
            src={image ? URL.createObjectURL(image) : assets.upload_area}
            alt=""
          />
        </label>
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-green-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <p>Album Description</p>
        <input
          onChange={(e) => setDesc(e.target.value)}
          className="bg-transparent outline-green-600 border-2 border-green-400 p-2.5 w-[max(40vw,250px)]"
          type="text"
          placeholder="Type here"
        />
      </div>

      <div className="flex flex-col gap-3">
        <p>Background Colour</p>
        <input onChange={(e) => setColour(e.target.value)} type="color" />
      </div>

      <button className="text-base bg-black text-white py-2.5 px-14 cursor-pointer ">
        Add Album
      </button>
    </form>
  );
};

export default AddAlbum;
