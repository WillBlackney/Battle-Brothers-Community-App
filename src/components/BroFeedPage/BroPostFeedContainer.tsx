import { Button, Flex, Input, Stack } from "@chakra-ui/react";
import { collection, getDocs, query } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { BroBuild } from "../../atoms/broBuildsAtom";
import { auth, firestore } from "../../firebase/clientApp";
import useBroBuilds from "../../hooks/useBroBuilds";
import BroPostItemFeed from "./BroPostItemFeed";

type FilterOptions = "new" | "popularAllTime" | "popularRecent";

const BroPostFeedContainer: React.FC = () => {
  // State
  const [filterCondition, setFilterCondition] = useState<FilterOptions>("new");
  const [searchTerm, setSearchTerm] = useState("");
  const [user] = useAuthState(auth);

  const filteredBuilds = (): BroBuild[] => {
    // Filter by search term
    let builds = broBuildsStateValue.allBroBuilds.filter((build) =>
      build.buildName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Order by newest
    if (filterCondition === "new") {
      builds = Object.values(builds).sort(
        (a, b) => b.createdAt!.toMillis() - a.createdAt!.toMillis()
      );
    }

    // Order by most popular (all time)
    else if (filterCondition === "popularRecent") {
      builds = Object.values(builds).sort(
        (a, b) => b.voteStatus - a.voteStatus
      );
    }
    // Order by most popular (last 30 days)
    else if (filterCondition === "popularAllTime") {
      builds = Object.values(builds).sort(
        (a, b) => b.voteStatus - a.voteStatus
      );
    }

    return builds;
  };

  // Hooks
  const {
    broBuildsStateValue,
    setBroBuildsStateValue,
    onVoteBroBuild,
    onSelectBroBuild,
    onDeleteBroBuild,
  } = useBroBuilds();

  // Getters
  const getBroBuildPosts = async () => {
    // Get bro builds data from DB
    try {
      const postQuery = query(collection(firestore, "brobuilds"));
      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update client side global state with newly fetched data
      setBroBuildsStateValue((prev) => ({
        ...prev,
        allBroBuilds: posts as BroBuild[],
      }));
    } catch (error: any) {
      console.log("getBroBuildPosts error: ", error.message);
    }
  };

   // Effects
   useEffect(() => {
    // Fetch data from DB on initial page load
    getBroBuildPosts();
  }, []);

  

  // Input Events
  const onSearchTermInputChanged = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    console.log(searchTerm);
    const newValue = event.target.value;
    setSearchTerm(newValue);
  };
  const onNewFilterButtonClicked = () => {
    console.log("onNewFilterButtonClicked");
    setFilterCondition("new");
    return;
  };
  const onPopularAllTimeFilterButtonClicked = () => {
    setFilterCondition("popularAllTime");
    return;
  };
  const onPopularRecentFilterButtonClicked = () => {
    setFilterCondition("popularRecent");
    return;
  };

 

  // JSX
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
          <Button onClick={onNewFilterButtonClicked} width="150px">
            New
          </Button>
          <Button onClick={onPopularAllTimeFilterButtonClicked} width="150px">
            Popular (All Time)
          </Button>
          <Button onClick={onPopularRecentFilterButtonClicked} width="150px">
            Popular (30 Days)
          </Button>
        </Flex>
      </Flex>
      <Stack pt={2}>
        {filteredBuilds().map((item) => (
          <BroPostItemFeed
            key={item.id}
            broBuild={item}
            userIsCreator={user?.uid === item.creatorId}
            userVoteValue={
              broBuildsStateValue.postVotes.find(
                (vote) => vote.broBuildId === item.id
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
