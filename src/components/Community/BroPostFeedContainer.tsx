import { Flex, Stack } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BroBuild } from "../../atoms/broBuildsAtom";
import { auth, firestore } from "../../firebase/clientApp";
import useBroBuilds from "../../hooks/useBroBuilds";
import BroPostItem from "./BroPostItem";

type BroPostFeedContainerProps = {
  // to do: needs to be a collection of bros, not 1
  //brobuildData: BroBuild;
  //userId?: string;
};

const BroPostFeedContainer: React.FC<BroPostFeedContainerProps> = () => {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    broBuildsStateValue,
    setBroBuildsStateValue,
    onVoteBroBuild,
    onSelectBroBuild,
    onDeleteBroBuild,
  } = useBroBuilds();
  const getBroBuildPosts = async () => {
    try {
      const postQuery = query(collection(firestore, "brobuilds"));
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        uid: doc.id,
        ...doc.data(),
      }));

      console.log("raw posts: ", posts);
      setBroBuildsStateValue((prev) => ({
        ...prev,
        allBroBuilds: posts as BroBuild[],
      }));
    } catch (error: any) {
      console.log("getBroBuildPosts error: ", error.message);
    }
  };

  useEffect(() => {
    getBroBuildPosts();
  }, []);
  return (
    <Stack pt={2}>
      {broBuildsStateValue.allBroBuilds.map((item) => (
        <BroPostItem
          key={item.uid}
          broBuild={item}
          userIsCreator={user?.uid === item.creatorId}
          userVoteValue={
            broBuildsStateValue.postVotes.find(
              (vote) => vote.broBuildId === item.uid
            )?.voteValue
          }
          onVote={onVoteBroBuild}
          onSelect={onSelectBroBuild}
          onDelete={onDeleteBroBuild}
        ></BroPostItem>
      ))}
    </Stack>
  );
};
export default BroPostFeedContainer;
