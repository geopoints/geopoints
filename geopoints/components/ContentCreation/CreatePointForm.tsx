import React, { useState, useContext, Dispatch, SetStateAction } from 'react';
import UploadWidget from '../UploadWidget';
import { MapContext } from '../../contexts/MapContext';
import { DisplayedPointsContext } from '../../contexts/DisplayedPointsContext';
import { faker } from '@faker-js/faker';
import { useUser } from '@auth0/nextjs-auth0/client';
import { useUserData } from '../../hooks/useUserData';
import { List } from '../../types/types';
import {createPoint} from "../../util/createPoint"
import {
  Select,
  Option,
  Input,
  Checkbox,
  Button,
} from '@material-tailwind/react';

interface CreatePostFormProps {
  setShowCreatePoint: Dispatch<SetStateAction<boolean>>;
}

const labelClass = 'w-full text-base font-bold text-gray-800';
const inputClass = 'border-black border-2 rounded-md min-w-50 text-black';

export default function CreatePointForm({
  setShowCreatePoint,
}: CreatePostFormProps) {
  const [checkboxState, setCheckboxState] = useState<boolean>(false);
  const [imgUploaded, setImgUploaded] = useState<boolean>(false);
  const [imgPath, setImgPath] = useState<string>('');
  const [pointInput, setPointInput] = useState<any>({});

  const { user } = useUser();
  const { data } = useUserData(user!);
  const { map } = useContext(MapContext);
  const { setDisplayedPoints } = useContext(
    DisplayedPointsContext
  );
  const {refetch} = useUserData(user!)
  
  const pointFormSubmitHandler = async (e: any) => {
    e.preventDefault();
    console.log({ imgPath });
    const pointData = {
      title: pointInput.title,
      description: pointInput.description,
      isPublic: checkboxState,
      lng: map?.getCenter()?.lng(),
      lat: map?.getCenter()?.lat(),
      imagePath: imgPath ?? '/favicon.ico',
      listId: pointInput.listId,
    };
    try {
      const newPoint = await createPoint(pointData, pointInput.listId);
      console.log(newPoint.newPoint)
      refetch()
      window.localStorage.setItem('list' + pointInput.listId, 'true')
      setDisplayedPoints&&setDisplayedPoints(samePoints => [...samePoints, newPoint.newPoint])
      setShowCreatePoint(false)
      return newPoint;
    } catch (err) {
      console.log(err);
    }
  };

  const titleInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput({ ...pointInput, title: e.target.value });
  };
  const descriptionInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPointInput({ ...pointInput, description: e.target.value });
  };
  const publicInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckboxState(!checkboxState);
    // setPointInput({ ...pointInput, public: checkboxState });
  };
  const listInputHandler = (listId: string | undefined) => {
    console.log({ listId });
    setPointInput({ ...pointInput, listId });
  };

  return (
    data && (
      <form
        onSubmit={pointFormSubmitHandler}
        className="mt-10 m-w-96 flex flex-col"
      >
        <div className="my-2">
          <Input
            variant="standard"
            label="Title"
            onChange={titleInputHandler}
            required={true}
            maxLength={25}
          />
        </div>
        <div className="my-2">
          <Input
            variant="standard"
            label="Description"
            onChange={descriptionInputHandler}
            required={true}
            maxLength={50}
          />
        </div>
        <div className="my-2">
          <Checkbox
            label="Make public"
            ripple={true}
            onChange={publicInputHandler}
          />
        </div>
        <Select
          id="List"
          name="List"
          label="Select List"
          onChange={listInputHandler}
        >
          {data.ownLists.map((list: List) => (
            <Option key={list.id} value={String(list.id)}>
              {list.title}
            </Option>
          ))}
        </Select>

        <div className="my-5">
          <UploadWidget
            setImgUploaded={setImgUploaded}
            setImgPath={setImgPath}
            multiple={false}
          />
        </div>
        <div className="my-1">
          <Button
            ripple={true}
            type="submit"
            disabled={pointInput.listId ? false : true}
          >
            Create
          </Button>
        </div>
      </form>
    )
  );
}
