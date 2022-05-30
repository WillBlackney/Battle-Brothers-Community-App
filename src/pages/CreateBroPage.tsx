import { Flex, Input, Button, Text } from "@chakra-ui/react";
import { auth, firestore } from "../firebase/clientApp";
import {
  doc,
  getDoc,
  runTransaction,
  serverTimestamp,
  setDoc,
  Transaction,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import PageContentLayout from "../components/Layout/PageContent";
import AttributeRow from "./AttributeRow";
import { getAttributeData } from "../data controllers/AttributeDataController";
import PerkIcon from "./PerkIcon";
import {
  AllPerkData,
  getPerkDataByName,
} from "../data controllers/PerkDataController";

type CreateBroPageProps = {};

const CreateBroPage: React.FC<CreateBroPageProps> = () => {
  const [user] = useAuthState(auth);
  const [buildName, setBuildName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Attribute tracking stat
  const [health, setHealth] = useState(0);
  const [fatigue, setFatigue] = useState(0);
  const [resolve, setResolve] = useState(0);
  const [initiative, setInitiative] = useState(0);
  const [meleeAttack, setMeleeAttack] = useState(0);
  const [rangedAttack, setRangedAttack] = useState(0);
  const [meleeDefence, setMeleeDefence] = useState(0);
  const [rangedDefence, setRangedDefence] = useState(0);

  const handlePublishBroBuild = async () => {
    // validate build name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (buildName.length < 3) {
      return setError(
        //"Build name must be between 3–21 characters, and can only contain letters, numbers, or underscores."
        "Build name must be between 3–21 characters."
      );
    }

    useEffect(() => {}, [
      health,
      fatigue,
      resolve,
      initiative,
      meleeAttack,
      meleeDefence,
      rangedAttack,
      rangedDefence,
    ]);

    setLoading(true);

    try {
      // TO DO: generate a unique ID for the bro
      // Create the bro document in firestore

      const uniqueId = uuidv4();
      console.log("unique id generated: ", uniqueId);
      const broBuildsDocRef = doc(firestore, "brobuilds", uniqueId);

      await runTransaction(firestore, async (transaction) => {
        // publish the bro to database
        transaction.set(broBuildsDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          buildName: buildName,
          uid: uniqueId,
          numberOfComments: 0,
          voteStatus: 0,

          // to do: perks/stats, etc
          // attributes
          minHealth: health,
          minFatigue: fatigue,
          minResolve: resolve,
          minInitiative: initiative,
          minMeleeAttack: meleeAttack,
          minRangedAttack: rangedAttack,
          minMeleeDefence: meleeDefence,
          minRangedDefence: rangedDefence,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/broBuildSnippets`, uniqueId),
          {
            uid: uniqueId,
            buildName: buildName,
          }
        );
      });
    } catch (error: any) {
      console.log("handlePublishBroBuild error", error);
      setError(error.message);
    }

    setLoading(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.value.length > 21) return;
    setError("");
    setBuildName(event.target.value);
    setCharsRemaining(21 - event.target.value.length);
    console.log(buildName);
  };

  return (
    // Main Container
    <Flex
      align="center"
      justify="center"
      direction="column"
      bg="white"
      width={"90%"}
      height="100%"
      borderRadius={4}
      borderColor="red"
      borderWidth="2px"
      p={2}
      m={5}
    >
      {/* Name Row */}
      <Flex
        align="center"
        bg="gray.100"
        borderRadius={4}
        borderColor="red"
        borderWidth="2px"
        width="100%"
        justify="center"
        mb={4}
      >
        <Input
          onChange={handleChange}
          placeholder="Build name..."
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
          width="30%"
          color={charsRemaining === 0 ? "red" : "gray.500"}
        />
      </Flex>

      {/* Perks Row */}
      <Flex
        direction="column"
        align="center"
        bg="gray.100"
        borderRadius={4}
        borderColor="red"
        borderWidth="2px"
        width="100%"
        height="350px"
        justify="start"
        mb={4}
      >
        {/*Tier 1 Perks */}
        <Flex
          align="center"
          borderRadius={4}
          borderColor="blue"
          borderWidth="2px"
          width="100%"
          height="45px"
          justify="center"
        >
          {AllPerkData.filter((p) => p.tierLevel === 1).map((perk) => (
            <PerkIcon perkData={perk}></PerkIcon>
          ))}
        </Flex>
        {/*Tier 2 Perks */}
        <Flex
          align="center"
          borderRadius={4}
          borderColor="blue"
          borderWidth="2px"
          width="100%"
          height="45px"
          justify="center"
        >
          {AllPerkData.filter((p) => p.tierLevel === 2).map((perk) => (
            <PerkIcon perkData={perk}></PerkIcon>
          ))}
        </Flex>
        {/*Tier 3 Perks */}
        <Flex
          align="center"
          borderRadius={4}
          borderColor="blue"
          borderWidth="2px"
          width="100%"
          height="45px"
          justify="center"
        >
          {AllPerkData.filter((p) => p.tierLevel === 3).map((perk) => (
            <PerkIcon perkData={perk}></PerkIcon>
          ))}
        </Flex>
        {/*Tier 4 Perks */}
        <Flex
          align="center"
          borderRadius={4}
          borderColor="blue"
          borderWidth="2px"
          width="100%"
          height="45px"
          justify="center"
        >
          {AllPerkData.filter((p) => p.tierLevel === 4).map((perk) => (
            <PerkIcon perkData={perk}></PerkIcon>
          ))}
        </Flex>
        {/*Tier 5 Perks */}
        <Flex
          align="center"
          borderRadius={4}
          borderColor="blue"
          borderWidth="2px"
          width="100%"
          height="45px"
          justify="center"
        >
          {AllPerkData.filter((p) => p.tierLevel === 5).map((perk) => (
            <PerkIcon perkData={perk}></PerkIcon>
          ))}
        </Flex>
        {/*Tier 6 Perks */}
        <Flex
          align="center"
          borderRadius={4}
          borderColor="blue"
          borderWidth="2px"
          width="100%"
          height="45px"
          justify="center"
        >
          {AllPerkData.filter((p) => p.tierLevel === 6).map((perk) => (
            <PerkIcon perkData={perk}></PerkIcon>
          ))}
        </Flex>
        {/*Tier 7 Perks */}
        <Flex
          align="center"
          borderRadius={4}
          borderColor="blue"
          borderWidth="2px"
          width="100%"
          height="45px"
          justify="center"
        >
          {AllPerkData.filter((p) => p.tierLevel === 7).map((perk) => (
            <PerkIcon perkData={perk}></PerkIcon>
          ))}
        </Flex>
      </Flex>

      {/* Stats + Avatar Row */}
      <Flex
        justifyContent="space-evenly"
        bg="gray.100"
        borderRadius={4}
        borderColor="red"
        borderWidth="2px"
        width="100%"
        height="300px"
        justify="center"
        align={"center"}
        mb={4}
      >
        {/*Avatar */}
        <Flex
          align="center"
          bg="white"
          borderRadius={4}
          borderColor="red"
          borderWidth="2px"
          width="30%"
          height="90%"
          justify="center"
        >
          Avatar
        </Flex>
        {/*Items */}
        <Flex
          align="center"
          bg="white"
          borderRadius={4}
          borderColor="red"
          borderWidth="2px"
          width="30%"
          height="90%"
          justify="center"
        >
          Items
        </Flex>
        {/*Stats*/}
        {/*Colums + Header Text Fitter*/}
        <Flex direction="column" justify="center" align="center" height="100%">
          {/* Columns Fitter*/}
          <Text width={"100%"} textAlign="center">
            Minimum Attribute Levels
          </Text>

          <Flex
            align="center"
            bg="white"
            borderRadius={4}
            borderColor="red"
            borderWidth="2px"
            width="100%"
            height="100%"
            justify="center"
          >
            {/*Stat Column 1*/}
            <Flex
              align="center"
              bg="white"
              borderRadius={4}
              borderColor="blue"
              borderWidth="1px"
              width="50%"
              height="100%"
              justify="center"
              direction="column"
            >
              <AttributeRow
                onAttributeValueChanged={setHealth}
                attributeData={getAttributeData("Health")}
              ></AttributeRow>
              <AttributeRow
                onAttributeValueChanged={setFatigue}
                attributeData={getAttributeData("Fatigue")}
              ></AttributeRow>
              <AttributeRow
                onAttributeValueChanged={setResolve}
                attributeData={getAttributeData("Resolve")}
              ></AttributeRow>
              <AttributeRow
                onAttributeValueChanged={setInitiative}
                attributeData={getAttributeData("Initiative")}
              ></AttributeRow>
            </Flex>
            {/*Stat Column 2*/}
            <Flex
              align="center"
              bg="white"
              borderRadius={4}
              borderColor="blue"
              borderWidth="1px"
              width="50%"
              height="100%"
              justify="center"
              direction="column"
            >
              <AttributeRow
                onAttributeValueChanged={setMeleeAttack}
                attributeData={getAttributeData("Melee Attack")}
              ></AttributeRow>
              <AttributeRow
                onAttributeValueChanged={setRangedAttack}
                attributeData={getAttributeData("Ranged Attack")}
              ></AttributeRow>
              <AttributeRow
                onAttributeValueChanged={setMeleeDefence}
                attributeData={getAttributeData("Melee Defence")}
              ></AttributeRow>
              <AttributeRow
                onAttributeValueChanged={setRangedDefence}
                attributeData={getAttributeData("Ranged Defence")}
              ></AttributeRow>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      {/* Description Row*/}
      <Flex
        align="center"
        bg="gray.100"
        borderRadius={4}
        borderColor="red"
        borderWidth="2px"
        width="100%"
        height="200px"
        justify="center"
        mb={4}
      >
        Description
      </Flex>
      <Button
        width="150px"
        m={5}
        onClick={handlePublishBroBuild}
        isLoading={loading}
      >
        Publish
      </Button>
    </Flex>

    /*
    <Flex
      direction="column"
      bg="white"
      width={'auto'}
      height="auto"
      borderRadius={4}
      border="px solid"
      borderColor="gray.300"
      p={2}
      m={4}
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
          onChange={handleChange}
          placeholder="Build name..."
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
          width="50%"
          color={charsRemaining === 0 ? "red" : "gray.500"}
        />
      </Flex>
      <Flex
        justify="center"
        align="center"
        bg="white"
        height="60px"
        borderColor="gray.300"
        width="100%"
        p={3}
      >
        <Button
          width="150px"
          m={5}
          onClick={handlePublishBroBuild}
          isLoading={loading}
        >
          Publish
        </Button>
        <Button width="150px" m={5}>
          Save Draft
        </Button>
      </Flex>
      <Text color="red" fontSize="9pt" pt={1}>
        {error}
      </Text>
    </Flex>
    */
  );
};
export default CreateBroPage;
