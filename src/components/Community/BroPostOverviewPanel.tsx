import React from "react";
import { BroBuild } from "../../atoms/broBuildsAtom";
import {
  IoArrowDownCircleOutline,
  IoArrowDownCircleSharp,
  IoArrowRedoOutline,
  IoArrowUpCircleOutline,
  IoArrowUpCircleSharp,
  IoBookmarkOutline,
} from "react-icons/io5";
import { Flex } from "@chakra-ui/react";

type BroPostOverviewPanelProps = {
  broBuild: BroBuild;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: () => {};
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
  console.log(broBuild);
  console.log("my id = " + broBuild.uid);
  return (
    <Flex height="50px" mt={2} border="1px solid" bg="white">
      Build Id = {broBuild.uid}
    </Flex>
  );
};
export default BroPostOverviewPanel;
