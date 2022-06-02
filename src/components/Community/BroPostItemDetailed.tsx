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
import { Flex, Icon, Spinner, Stack, Text, Image } from "@chakra-ui/react";
import moment from "moment";
import { AiOutlineDelete } from "react-icons/ai";
import { BsDot, BsChat } from "react-icons/bs";
import router, { useRouter } from "next/router";
import PerkIcon from "../../pages/PerkIcon";
import AttributeRow from "../../pages/AttributeRow";
import { getAttributeData } from "../../data controllers/AttributeDataController";

type BroPostItemDetailedProps = {
  broBuild: BroBuild;
  userIsCreator: boolean;
  userVoteValue?: number;
  onVote: (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    broBuild: BroBuild,
    vote: number
  ) => void;
  onDelete: (broBuild: BroBuild) => Promise<boolean>;
};

const BroPostItemDetailed: React.FC<BroPostItemDetailedProps> = ({
  broBuild,
  userIsCreator,
  userVoteValue,
  onVote,
  onDelete,
}) => {
  const [loadingDelete, setLoadingDelete] = useState(false);
  const router = useRouter();
  const handleDelete = async (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    setLoadingDelete(true);
    try {
      const success = await onDelete(broBuild);
      if (!success) throw new Error("Failed to delete bro build");

      console.log("Bro build successfully deleted");

      // Back to feed page
      router.back();
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
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor={"gray.300"}
      borderRadius={"4px"}
      width="40%"
    >
      {/* Left Upvote Section */}
      <Flex
        direction="column"
        align="center"
        bg={"gray.300"}
        p={2}
        width="40px"
        borderRadius={"3px 0px 0px 3px"}
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
      {/* Main Content Flex */}
      <Flex direction="column" width="80%">
        {/* Poster, Build Name + Description Section */}
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
          <Text fontSize="10pt">{broBuild.description}</Text>
        </Stack>
        {/* Attributes + Perks Wrapper*/}
        <Flex height={"100%"} align="center" justify={"space-evenly"}>
          {/* Perks Panel */}
          <Flex
            justify={"start"}
            height={"300px"}
            width="45%"
            direction={"column"}
            align="center"
            borderWidth="2px"
          >
            <Text fontWeight={600}> Perks</Text>
            <Flex height={"50px"} m={2}>
              {broBuild.perks?.slice(0, 3).map((perk) => (
                <PerkIcon
                  key={perk.perkName}
                  perkData={perk}
                  viewBroPage={true}
                ></PerkIcon>
              ))}
            </Flex>
            <Flex height={"50px"} m={2}>
              {broBuild.perks?.slice(3, 6).map((perk) => (
                <PerkIcon
                  key={perk.perkName}
                  perkData={perk}
                  viewBroPage={true}
                ></PerkIcon>
              ))}
            </Flex>
            <Flex height={"50px"} m={2}>
              {broBuild.perks?.slice(6, 11).map((perk) => (
                <PerkIcon
                  key={perk.perkName}
                  perkData={perk}
                  viewBroPage={true}
                ></PerkIcon>
              ))}
            </Flex>
          </Flex>
          {/* Attributes Panel */}

          <Flex
            justify={"start"}
            height={"300px"}
            width="45%"
            direction={"column"}
            align="center"
            borderWidth="2px"
          >
            {/* Columns Fitter*/}
            <Text fontWeight={600}> Minimum Attributes</Text>

            <Flex
              align="center"
              bg="white"
              borderRadius={4}
              width="100%"
              height="100%"
              justify="center"
            >
              {/*Stat Column 1*/}
              <Flex
                align="center"
                bg="white"
                borderRadius={4}
                width="50%"
                height="100%"
                justify="start"
                direction="column"
              >
                <AttributeRow
                  initialStatValue={broBuild.health}
                  attributeData={getAttributeData("Health")}
                  viewBroPage={true}
                ></AttributeRow>
                <AttributeRow
                  initialStatValue={broBuild.fatigue}
                  attributeData={getAttributeData("Fatigue")}
                  viewBroPage={true}
                ></AttributeRow>
                <AttributeRow
                  initialStatValue={broBuild.resolve}
                  attributeData={getAttributeData("Resolve")}
                  viewBroPage={true}
                ></AttributeRow>
                <AttributeRow
                  initialStatValue={broBuild.initiative}
                  attributeData={getAttributeData("Initiative")}
                  viewBroPage={true}
                ></AttributeRow>
              </Flex>
              {/*Stat Column 2*/}
              <Flex
                align="center"
                bg="white"
                borderRadius={4}
                width="50%"
                height="100%"
                justify="start"
                direction="column"
                flex={"start"}
              >
                <AttributeRow
                  initialStatValue={broBuild.meleeAttack}
                  attributeData={getAttributeData("Melee Attack")}
                  viewBroPage={true}
                ></AttributeRow>
                <AttributeRow
                  initialStatValue={broBuild.rangedAttack}
                  attributeData={getAttributeData("Ranged Attack")}
                  viewBroPage={true}
                ></AttributeRow>
                <AttributeRow
                  initialStatValue={broBuild.meleeDefence}
                  attributeData={getAttributeData("Melee Defence")}
                  viewBroPage={true}
                ></AttributeRow>
                <AttributeRow
                  initialStatValue={broBuild.rangedDefence}
                  attributeData={getAttributeData("Ranged Defence")}
                  viewBroPage={true}
                ></AttributeRow>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
        {/* Bottom Buttons Bar */}
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
      {/* Avatar Section Right */}
      <Flex width="20%" align="center" justify="center" bg="gray.100">
        <Image src={"/images/bro_avatar_1.png"} width="80%"></Image>
      </Flex>
    </Flex>
  );
};
export default BroPostItemDetailed;
