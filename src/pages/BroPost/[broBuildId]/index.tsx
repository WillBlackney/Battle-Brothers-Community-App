import { auth, firestore } from "../../../firebase/clientApp";
import React, { useEffect } from "react";
import { doc, getDoc } from "firebase/firestore";
import { BroBuild } from "../../../atoms/broBuildsAtom";
import { Flex, Stack } from "@chakra-ui/react";
import useBroBuilds from "../../../hooks/useBroBuilds";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import BroPostItemDetailed from "../../../components/Community/BroPostItemDetailed";

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
        <BroPostItemDetailed
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
        ></BroPostItemDetailed>
      )}
    </Flex>
  );
};
export default BroPostPage;
