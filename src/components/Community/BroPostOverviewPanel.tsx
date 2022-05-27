import React, { useState } from "react";
import { BroBuild } from "../../atoms/broBuildsAtom";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import {
  Flex,
  Icon,
  Link,
  Skeleton,
  Spinner,
  Stack,
  Text,
  Image,
} from "@chakra-ui/react";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { BsDot, BsChat } from "react-icons/bs";
import { FaReddit } from "react-icons/fa";

type BroPostOverviewPanelProps = {
  broBuild: BroBuild;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (broBuild: BroBuild, vote: number) => void;
  onDelete: () => {};
  onSelect: () => void;
};

const BroPostOverviewPanel: React.FC<BroPostOverviewPanelProps> = ({
  broBuild,
  userIsCreator,
  userVoteValue,
  onVote,
  onDelete,
  onSelect,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={4}
      cursor="pointer"
      //_hover={{ borderColor: singlePostView ? "none" : "gray.500" }}
      //onClick={() => onSelectPost && post && onSelectPost(post, postIdx!)}
    >
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        p={2}
        width="40px"
        borderRadius="3px 0px 0px 3px"
      >
        <Icon
          as={
            userVoteValue === 1 ? IoArrowUpCircleSharp : IoArrowUpCircleOutline
          }
          color={userVoteValue === 1 ? "brand.100" : "gray.400"}
          fontSize={22}
          cursor="pointer"
          onClick={() => onVote(broBuild, 1)}
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
          onClick={() => onVote(broBuild, -1)}
        />
      </Flex>
      <Flex direction="column" width="80%">
        <Stack spacing={1} p="10px 10px">
          {broBuild.createdAt && (
            <Stack direction="row" spacing={0.6} align="center" fontSize="9pt">
              <Text color="gray.500">
                Posted by u/{broBuild.creatorId}{" "}
                {moment(new Date(broBuild.createdAt.seconds * 1000)).fromNow()}
              </Text>
            </Stack>
          )}
          <Text fontSize="12pt" fontWeight={600}>
            {broBuild.buildName}
          </Text>
          {/*<Text fontSize="10pt">{post.body}</Text>*/}
          {/* post.imageURL && (
            <Flex justify="center" align="center" p={2}>
              {loadingImage && (
                <Skeleton height="200px" width="100%" borderRadius={4} />
              )}
              <Image
                // width="80%"
                // maxWidth="500px"
                maxHeight="460px"
                src={post.imageURL}
                display={loadingImage ? "none" : "unset"}
                onLoad={() => setLoadingImage(false)}
                alt="Post Image"
              />
            </Flex>
          )*/}
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
            <Text fontSize="9pt">XX</Text>
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
              //onClick={handleDelete}
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
export default BroPostOverviewPanel;
