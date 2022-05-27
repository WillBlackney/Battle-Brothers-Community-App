import { auth, firestore } from "../../../firebase/clientApp";
import { GetServerSideProps } from "next";
import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { BroBuild } from "../../../atoms/broBuildsAtom";
import safeJsonStringify from "safe-json-stringify";
import { Flex, Stack } from "@chakra-ui/react";
import BroPostPageNotFound from "../../../components/Community/BroPostPageNotFound";
import PageContentLayout from "../../../components/Layout/PageContent";
import useBroBuilds from "../../../hooks/useBroBuilds";
import BroPostItem from "../../../components/Community/BroPostItem";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

type BroPostPageProps = {
  broBuildData: BroBuild;
};

const BroPostPage: React.FC<BroPostPageProps> = () => {
  const [user] = useAuthState(auth);
  const {
    broBuildsStateValue,
    setBroBuildsStateValue,
    onDeleteBroBuild,
    onVoteBroBuild,
  } = useBroBuilds();
  const router = useRouter();

  const fetchBroBuild = async (broBuildUid: string) => {
    try {
      const broBuildsDocRef = doc(firestore, "brobuilds", broBuildUid);
      const broBuildDoc = await getDoc(broBuildsDocRef);
      setBroBuildsStateValue((prev) => ({
        ...prev,
        selectedBroBuild: {
          uid: broBuildDoc.id,
          ...broBuildDoc.data(),
        } as BroBuild,
      }));
    } catch (error) {
      console.log("fetchBroBuild() error: ", error);
    }
  };
  useEffect(() => {
    const { broBuildId } = router.query;
    if (broBuildId && !broBuildsStateValue.selectedBroBuild) {
      fetchBroBuild(broBuildId as string);
    }
  }, [router.query, broBuildsStateValue.selectedBroBuild]);
  return (
    <Flex align="center" width="100%" justify="center" mt="4">
      {broBuildsStateValue.selectedBroBuild && (
        <BroPostItem
          broBuild={broBuildsStateValue.selectedBroBuild}
          onVote={onVoteBroBuild}
          onDelete={onDeleteBroBuild}
          userVoteValue={
            broBuildsStateValue.postVotes.find(
              (item) =>
                item.broBuildId === broBuildsStateValue.selectedBroBuild?.uid
            )?.voteValue
          }
          userIsCreator={
            user?.uid === broBuildsStateValue.selectedBroBuild?.creatorId
          }
        ></BroPostItem>
      )}
    </Flex>
  );
  {
    /*
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
*/
  }
};
export default BroPostPage;
