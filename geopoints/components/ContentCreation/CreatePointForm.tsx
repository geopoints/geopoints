import React, { useState, useContext } from 'react';
import UploadWidget from '../UploadWidget';
import { User } from '../../types/types';
import { UserDataContext } from '../../contexts/UserDataContext';
import { MapContext } from '../../contexts/MapContext';
import { Point } from '../../types/types';

const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 w-fit text-black';

export default function CreatePointForm() {
  const [imgUploaded, setImgUploaded] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string>('');
  const [pointInput, setPointInput] = useState<any>({});
  const { userData } = useContext(UserDataContext);
  const { map } = useContext(MapContext);

  const pointFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    const pointData = {
      title: pointInput?.title,
      description: pointInput?.description,
      isPublic: pointInput?.public === 'on' ? true : false,
      lng: map?.getCenter()?.lat(),
      lat: map?.getCenter()?.lng(),
      // imagePath: imgPath ? [imgPath] : [],
      // listId: pointInput?.list?.id,
      // likedBy: User[];
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_HOST}/api/points/create`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ pointData, listId: pointInput?.list }),
        }
      );
      console.log({ pointData, listId: pointInput?.list });
      if (!res.ok) throw new Error('Error creating a new point');
      const newUser = await res.json();
      return newUser;
    } catch (err) {
      console.log(err);
    }
  };

  const titleInputHandler = (e: any) => {
    setPointInput({ ...pointInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: any) => {
    setPointInput({ ...pointInput, description: e.target.value });
  };
  const tagsInputHandler = (e: any) => {
    setPointInput({ ...pointInput, tags: e.target.value });
  };
  const publicInputHandler = (e: any) => {
    setPointInput({ ...pointInput, public: e.target.value });
  };
  const listInputHandler = (e: any) => {
    console.log(JSON.parse(e.target.value));
    setPointInput({ ...pointInput, list: e.target.value });
  };

  return (
    <form
      onSubmit={pointFormSubmitHandler}
      className="
    mt-10
    flex
    flex-col
    "
    >
      <label htmlFor="Title" className={labelClass}>
        Title
      </label>
      <input
        id="Title"
        type="text"
        className={inputClass}
        onChange={titleInputHandler}
        required
      />
      <label htmlFor="Description" className={labelClass}>
        Description
      </label>
      <input
        id="Description"
        type="textarea"
        className={inputClass}
        onChange={descriptionInputHandler}
        required
      />
      <label htmlFor="Public" className={labelClass}>
        Make post public?
      </label>
      <span>
        <input id="Public" type="checkbox" onChange={publicInputHandler} />
      </span>
      <label htmlFor="List" className={labelClass}>
        List
      </label>
      <select
        id="List"
        name="List"
        className={inputClass}
        onChange={listInputHandler}
      >
        {/* ACCESSING LIST INFO ??*/}
        {userData?.ownLists.map((list) => (
          <option key={list.id} value={list.id}>
            {list.title}
          </option>
        ))}
      </select>
      <label htmlFor="Tags" className={labelClass}>
        Tags
      </label>
      <input
        id="Tags"
        type="text"
        placeholder="#tree #park #skate-park..."
        className={inputClass}
        onChange={tagsInputHandler}
      />
      <div className="mt-4">
        <UploadWidget
          setImgUploaded={setImgUploaded}
          setImgPath={setImgPath}
          multiple={false}
        />
      </div>
      <button
        type="submit"
        className="border-black border-2 rounded-md min-w-50 w-fit text-black mt-4 p-1"
      >
        Submit
      </button>
    </form>
  );
}