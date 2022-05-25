import React from "react";
import { Post } from "../../../atoms/postsAtom";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Flex } from "@chakra-ui/react";

type BroPostItemProps = {
  post: Post;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
  onDeletePost: () => {};
  onSelectPost: () => {};
};

const BroPostItem: React.FC<BroPostItemProps> = ({
  post,
  userIsCreator,
  userVoteValue,
  onVote,
  onDeletePost,
  onSelectPost,
}) => {
  return (
    <Flex border="1px solid" bg="white">
      {post.title}
    </Flex>
  );
};
export default BroPostItem;

