import { PrismaClient } from "@prisma/client";
import { GetServerSideProps } from "next";
import { Point } from "../../types/types.js";
import PointDisplay from "../../components/PointPage/PointDisplay";
import LoadingSpinner from "../../components/LoadingSpinner";
import { Button } from '@material-tailwind/react';
import { useRouter } from "next/router.js";

const prisma = new PrismaClient();

function PointPage({ pointData }: { pointData: Point }) {
  const router = useRouter();

  // const {data} = useUserData(user);
  // const userName = data?.userName;
  // console.log(userName)
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
      <Button
        ripple={false}
        onClick={() => {
          router.back();
        }}
        className="fixed bottom-20 right-4"
      >
        Back to List
      </Button>
    </>
  );
}
// () => router.push(`/${userName}/lists/${pointData.listId}`);

export const getServerSideProps: GetServerSideProps = async (context) => {
  let { pointId } = context.query;

  let pointData = await prisma.point.findUnique({
    where: { id: Number(pointId) },
  });

  return {
    props: { pointData },
  };
};

export default PointPage;
