import { PrismaClient } from '@prisma/client';
import { useContext } from 'react';
import { GetServerSideProps } from 'next';
import { Button } from '@material-tailwind/react';
import { Point } from '../../types/types';
import PointDisplay from '../../components/PointPage/PointDisplay';
import LoadingSpinner from '../../components/LoadingSpinner';
import { useRouter } from 'next/router';
import BackButton from '../../components/BackButton/BackButton';
import { MapContext } from '../../contexts/MapContext';

const prisma = new PrismaClient();

function PointPage({ pointData }: { pointData: Point }) {
  const router = useRouter();
  const { setPointWeWantToSee } = useContext(MapContext);

  function goToPoint() {
    setPointWeWantToSee &&
      setPointWeWantToSee({ lat: pointData.lat, lng: pointData.lng });
    router.push('/');
  }

  return (
    <>
      {pointData ? (
        <div className="flex flex-col">
          <PointDisplay
            imagePath={pointData.imagePath}
            title={pointData.title}
            desc={pointData.description!}
          />
        </div>
      ) : (
        <LoadingSpinner />
      )}
      <BackButton text="Back to List" />
      <Button onClick={goToPoint}>Go to point on map</Button>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pointId } = context.query;
  console.log(pointId);
  const pointData = await prisma.point.findUnique({
    where: { id: Number(pointId) },
  });
  return {
    props: { pointData },
  };
};

export default PointPage;
