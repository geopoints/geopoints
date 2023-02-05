import {
  Dispatch,
  Fragment,
  SetStateAction,
  useContext,
  useState,
} from 'react';
import {
  Button,
  Dialog,
  DialogHeader,
  DialogFooter,
} from '@material-tailwind/react';
import { ClickedMarkerContext } from '../../contexts/ClickedMarkerContext';
import { Point } from '../../types/types';

interface ClickedMarkerDialog {
  setShouldRoutesBeShown: Dispatch<SetStateAction<boolean>>;
}
export default function ClickedMarkerDialog({
  setShouldRoutesBeShown,
}: ClickedMarkerDialog) {
  const [open, setOpen] = useState(false);
  const [prevClickedPoint, setPrevClickedPoint] = useState<Point | null>();
  const { clickedPoint } = useContext(ClickedMarkerContext);

  if (prevClickedPoint?.id !== clickedPoint?.id) {
    console.log('hello');
    setPrevClickedPoint(clickedPoint);
    setOpen(true);
    setShouldRoutesBeShown(false);
  }

  const handleOpen = () => setOpen(!open);

  const handleShowRoute = () => {
    setShouldRoutesBeShown((shouldRoutesBeShown) => !shouldRoutesBeShown);
    setOpen(false);
  };
  return (
    <Fragment>
      <Dialog open={open} handler={handleOpen} className="w-96 flex flex-col">
        <DialogHeader className="text-xl mt-2">Point Options:</DialogHeader>
        <DialogFooter className="flex flex-col justify-center items-cente">
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="blue"
            onClick={handleShowRoute}
          >
            Show route
          </Button>
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="green"
            onClick={handleOpen}
          >
            Edit
          </Button>
          <Button
            className="my-1 w-24"
            variant="gradient"
            color="red"
            onClick={handleOpen}
          >
            Delete
          </Button>
        </DialogFooter>
      </Dialog>
    </Fragment>
  );
}
