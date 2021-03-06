import React, { useState } from "react";
import { BroBuild } from "../../atoms/broBuildsAtom";
import { Flex, Icon, Spinner, Stack, Text, Image } from "@chakra-ui/react";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { BsChat } from "react-icons/bs";
import { useRouter } from "next/router";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";

// Props
type BroPostItemProps = {
  broBuild: BroBuild;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    broBuild: BroBuild,
    vote: number
  ) => void;
  onDelete: (broBuild: BroBuild) => Promise<boolean>;
  onSelect?: (broBuild: BroBuild) => void;
};

const BroPostItemFeed: React.FC<BroPostItemProps> = ({
  broBuild,
  userIsCreator,
  userVoteValue,
  onVote,
  onDelete,
  onSelect,
}) => {
  // State
  const [loadingDelete, setLoadingDelete] = useState(false);

  // Setup
  const singlePostView = !onSelect;
  const router = useRouter();

  // Logic
  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDelete(broBuild);
      if (!success) throw new Error("Failed to delete bro build");

      console.log("Bro build successfully deleted");

      if (singlePostView && router) router.back();
    } catch (error: any) {
      console.log("Error deleting bro build", error.message);
      /**
       * Don't need to setLoading false if no error
       * as item will be removed from DOM
       */
      setLoadingDelete(false);
      // setError
    }
  };

  // JSX
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={singlePostView ? "white" : "gray.300"}
      borderRadius={singlePostView ? "4px 4px 0px 0px" : "4px"}
      cursor={singlePostView ? "unset" : "pointer"}
      onClick={() => onSelect && onSelect(broBuild)}
      _hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
    >
      <Flex
        direction="column"
        align="center"
        bg={singlePostView ? "none" : "gray.300"}
        p={2}
        width="40px"
        borderRadius={singlePostView ? "0" : "3px 0px 0px 3px"}
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event) => onVote(event, broBuild, 1)}
        />
        <Text fontSize="9pt" fontWeight={600}>
          {broBuild.voteStatus}
        </Text>
        <Icon
          as={
            userVoteValue === -1
              ? IoArrowDownCircleSharp
              : IoArrowDownCircleOutline
          }
          color={userVoteValue === -1 ? "#4379FF" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={(event) => onVote(event, broBuild, -1)}
        />
      </Flex>
      <Flex direction="column" width="80%">
        <Stack spacing={1} p="10px 10px">
          {broBuild.createdAt && (
            <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
              <Text color="gray.500">
                Posted by u/{broBuild.userDisplayText}{" "}
                {moment(new Date(broBuild.createdAt.seconds * 1000)).fromNow()}
              </Text>
            </Stack>
          )}
          <Text fontSize="12pt" fontWeight={600}>
            {broBuild.buildName}
          </Text>
        </Stack>
        <Flex ml={1} mb={0.5} color="gray.500" fontWeight={600}>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={BsChat} mr={2} />
            <Text fontSize="9pt">{broBuild.numberOfComments}</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoArrowRedoOutline} mr={2} />
            <Text fontSize="9pt">Share</Text>
          </Flex>
          <Flex
            align="center"
            p="8px 10px"
            borderRadius={4}
            _hover={{ bg: "gray.200" }}
            cursor="pointer"
          >
            <Icon as={IoBookmarkOutline} mr={2} />
            <Text fontSize="9pt">Save</Text>
          </Flex>
          {userIsCreator && (
            <Flex
              align="center"
              p="8px 10px"
              borderRadius={4}
              _hover={{ bg: "gray.200" }}
              cursor="pointer"
              onClick={handleDelete}
            >
              {loadingDelete ? (
                <Spinner size="sm" />
              ) : (
                <>
                  <Icon as={AiOutlineDelete} mr={2} />
                  <Text fontSize="9pt">Delete</Text>
                </>
              )}
            </Flex>
          )}
        </Flex>
      </Flex>
      <Flex width="20%" align="center" justify="center" bg="gray.100">
        <Image src={"/images/bro_avatar_1.png"} width="80%"></Image>
      </Flex>
    </Flex>
  );
};
export default BroPostItemFeed;
