import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BroBuild } from "../../atoms/broBuildsAtom";
import { auth, firestore } from "../../firebase/clientApp";
import useBroBuilds from "../../hooks/useBroBuilds";
import BroPostItemFeed from "./BroPostItemFeed";

type BroPostFeedContainerProps = {
  // to do: needs to be a collection of bros, not 1
  //brobuildData: BroBuild;
  //userId?: string;
};

const BroPostFeedContainer: React.FC<BroPostFeedContainerProps> = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const {
    broBuildsStateValue,
    setBroBuildsStateValue,
    onVoteBroBuild,
    onSelectBroBuild,
    onDeleteBroBuild,
  } = useBroBuilds();
  const onSearchTermInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    setSearchTerm(newValue);
  };
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
  }, [broBuildsStateValue]);
  return (
    <>
      <Flex
        direction="column"
        align="center"
        bg="white"
        height="auto"
        borderRadius={4}
        border="px solid"
        borderColor="gray.300"
        p={2}
      >
        <Flex
          align="center"
          bg="white"
          height="60px"
          p={2}
          width="100%"
          borderColor="gray.300"
        >
          {/*<Icon as={FaReddit} fontSize={36} color="gray.300" mr={4} />*/}
          <Input
            placeholder="Search for a bro..."
            fontSize="10pt"
            _placeholder={{ color: "gray.500" }}
            _hover={{
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid",
              borderColor: "blue.500",
            }}
            bg="gray.50"
            borderColor="gray.200"
            height="40px"
            borderRadius={4}
            width="100%"
            onChange={onSearchTermInputChanged}
          />
        </Flex>
        <Flex
          justify="space-between"
          align="center"
          bg="white"
          height="60px"
          borderColor="gray.300"
          width="100%"
          p={3}
        >
          <Button width="150px">New</Button>
          <Button width="150px">Popular (All Time)</Button>
          <Button width="150px">Popular (30 Days)</Button>
        </Flex>
      </Flex>
      <Stack pt={2}>
        {broBuildsStateValue.allBroBuilds.map((item) => (
          <BroPostItemFeed
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
          ></BroPostItemFeed>
        ))}
      </Stack>
    </>
  );
};
export default BroPostFeedContainer;
