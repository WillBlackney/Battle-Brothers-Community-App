import { firestore } from "../../../firebase/clientApp";
import { GetServerSideProps } from "next";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { BroBuild } from "../../../atoms/broBuildsAtom";
import safeJsonStringify from "safe-json-stringify";
import { Flex } from "@chakra-ui/react";
import BroPostPageNotFound from "../../../components/Community/BroPostPageNotFound";
import PageContentLayout from "../../../components/Layout/PageContent";

type BroPostPageProps = {
  broBuildData: BroBuild;
};

const BroPostPage: React.FC<BroPostPageProps> = ({ broBuildData }) => {
  console.log("Bro build data: ", broBuildData);
  if (!broBuildData) {
    return <BroPostPageNotFound></BroPostPageNotFound>;
  }
  return (
    <>
      <Flex bg="white">Bro Build Post Page for: {broBuildData.uid}</Flex>);
    </>
  );
};

export async function getServerSideProps(context: GetServerSideProps) {
  try {
    const broBuildsDocRef = doc(
      firestore,
      "brobuilds",
      context.query.broBuildId as string
    );
    const broBuildsDoc = await getDoc(broBuildsDocRef);

    return {
      props: {
        broBuildData: broBuildsDoc.exists()
          ? JSON.parse(
              safeJsonStringify({ uid: broBuildsDoc.id, ...broBuildsDoc.data })
            )
          : "",
      },
    };
  } catch (error) {
    console.log("getServerSideProps error: ", error);
  }
}
export default BroPostPage;
