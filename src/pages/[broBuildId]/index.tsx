import { firestore } from "../../firebase/clientApp";
import { GetServerSideProps } from "next";
import React from "react";
import { doc, getDoc } from "firebase/firestore";
import { BroBuild } from "../../atoms/broBuildsAtom";

type BroPostPageProps = {
    broBuildData: BroBuild;
};

const BroPostPage: React.FC<BroPostPageProps> = ({broBuildData}) => {
  return <div>Welcome to {broBuildData.uid}</div>;
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
        broBuildData: broBuildsDoc.data(),
      },
    };
  } catch (error) {
    console.log("getServerSideProps error: ", error);
  }
}
export default BroPostPage;
