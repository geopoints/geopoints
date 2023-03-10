import { useState, useContext, SetStateAction, Dispatch } from 'react';
import { useRouter } from 'next/router';

import CreatePointModal from './CreatePointModal';
import CreateListModal from './CreateListModal';
import CrosshairModal from './CrosshairModal';
import { MapContext } from '../../contexts/MapContext';

import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from '@material-tailwind/react';

interface NewProps {
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}

const New = ({ showSidebar, setShowSidebar }: NewProps) => {
  const [showCreatePoint, setShowCreatePoint] = useState<boolean>(false);
  const [showCreateList, setShowCreateList] = useState<boolean>(false);
  const [showCrosshairModal, setShowCrosshairModal] = useState(false);
  const { setShowCrosshair } = useContext(MapContext);

  const router = useRouter();

  function createPointHandler() {
    if (router.pathname != '/') {
      router.push('/');
    }
    setShowCrosshairModal(!showCrosshairModal);
    setShowCrosshair && setShowCrosshair(true);
  }

  return (
    <>
      <Menu>
        <MenuHandler
          onClick={() => {
            console.log('im here');
            if (showSidebar) {
              setShowSidebar(!showSidebar);
            }
          }}
        >
          <Button
            size="sm"
            variant="gradient"
            color='white'
            className='text-light-green-700'
          >
            NEW
          </Button>
        </MenuHandler>
        <MenuList>
          <MenuItem onClick={createPointHandler}>Point</MenuItem>
          <MenuItem onClick={() => setShowCreateList(!showCreateList)}>
            List
          </MenuItem>
        </MenuList>
      </Menu>
      <CreatePointModal
        showCreatePoint={showCreatePoint}
        setShowCreatePoint={setShowCreatePoint}
      />
      <CreateListModal
        showCreateList={showCreateList}
        setShowCreateList={setShowCreateList}
      />
      <CrosshairModal
        showCrosshairModal={showCrosshairModal}
        setShowCrosshairModal={setShowCrosshairModal}
        setShowCreatePoint={setShowCreatePoint}
      />
    </>
  );
};

export default New;
