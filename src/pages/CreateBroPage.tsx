import { Flex, Input, Button, Text, Textarea } from "@chakra-ui/react";
import { auth, firestore } from "../firebase/clientApp";
import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import AttributeRow from "./AttributeRow";
import { getAttributeData } from "../data controllers/AttributeDataController";
import PerkIcon from "./PerkIcon";
import { AllPerkData, PerkData } from "../data controllers/PerkDataController";
import PageContentLayout from "../components/Layout/PageContent";
import { useRouter } from "next/router";
import ItemSlot from "./BroPost/ItemSlot";

type CreateBroPageProps = {};

const CreateBroPage: React.FC<CreateBroPageProps> = () => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [buildName, setBuildName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(30);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");

  // Attribute tracking stat
  const [health, setHealth] = useState(0);
  const [fatigue, setFatigue] = useState(0);
  const [resolve, setResolve] = useState(0);
  const [initiative, setInitiative] = useState(0);
  const [meleeAttack, setMeleeAttack] = useState(0);
  const [rangedAttack, setRangedAttack] = useState(0);
  const [meleeDefence, setMeleeDefence] = useState(0);
  const [rangedDefence, setRangedDefence] = useState(0);

  // Perks
  const [perkPoints, setPerkPoints] = useState(10);
  const [selectedPerks, setSelectedPerks] = useState<PerkData[]>([]);
  const onPerkIconClicked = (perkClicked: PerkData) => {
    // Deselect
    if (selectedPerks.includes(perkClicked)) {
      var index = selectedPerks.indexOf(perkClicked);
      selectedPerks.splice(index, 1);
      setSelectedPerks([...selectedPerks]);
      console.log("selected perks removal:", selectedPerks);
      if (perkClicked.perkName !== "Student") {
        const newPerkPoints = perkPoints + 1;
        setPerkPoints(newPerkPoints);
      }
    }
    // Select
    else {
      if (perkPoints == 0 && perkClicked.perkName !== "Student") return;
      let newValue = selectedPerks;
      newValue.push(perkClicked);
      setSelectedPerks(newValue);
      console.log("selected perks addition:", selectedPerks);
      if (perkClicked.perkName !== "Student") {
        const newPerkPoints = perkPoints - 1;
        setPerkPoints(newPerkPoints);
      }
    }
  };

  // Publish the build to the DB!
  const handlePublishBroBuild = async () => {
    // validate build name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (buildName.length < 3) {
      return setError("Build name must be between 3–30 characters.");
    }

    setLoading(true);
    setError("");

    try {
      // Generate unique ID for the build
      const uniqueId = uuidv4();
      console.log("unique id generated: ", uniqueId);
      const broBuildsDocRef = doc(firestore, "brobuilds", uniqueId);

      await runTransaction(firestore, async (transaction) => {
        // Publish the bro to database
        transaction.set(broBuildsDocRef, {
          creatorId: user?.uid,
          createdAt: serverTimestamp(),
          userDisplayText: user?.email!.split("@")[0],
          buildName: buildName,
          id: uniqueId,
          numberOfComments: 0,
          voteStatus: 0,
          description: description,

          // Attributes
          health: health,
          fatigue: fatigue,
          resolve: resolve,
          initiative: initiative,
          meleeAttack: meleeAttack,
          rangedAttack: rangedAttack,
          meleeDefence: meleeDefence,
          rangedDefence: rangedDefence,
          perks: selectedPerks,
        });

        transaction.set(
          doc(firestore, `users/${user?.uid}/broBuildSnippets`, uniqueId),
          {
            id: uniqueId,
            buildName: buildName,
          }
        );
      });
    } catch (error: any) {
      console.log("handlePublishBroBuild error", error);
      setError(error.message);
    }

    // Route user back to the home page after succesful publish
    setLoading(false);
    if (error == "" && router) router.back();
  };

  const handleBuildNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.value.length > 30) return;
    setError("");
    setBuildName(event.target.value);
    setCharsRemaining(30 - event.target.value.length);
    console.log(buildName);
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const newValue = event.target.value;
    setDescription(newValue);
    console.log("description: ", description, newValue);
  };

  return (
    // Main Container
    <Flex width={"90%"} height={"100%"} align="center" justify={"center"}>
      <Flex
        align="center"
        justify="center"
        direction="column"
        bg="white"
        width={"80%"}
        height="100%"
        borderRadius={4}
        p={2}
        m={4}
      >
        {/* Name Row */}
        <Flex
          align="center"
          borderRadius={4}
          width="100%"
          justify="center"
          mb={4}
        >
          <Input
            onChange={handleBuildNameChange}
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
          width="100%"
          height="350px"
          justify="start"
          mb={4}
        >
          <Text>Perk Points: {perkPoints}</Text>
          {/*Tier 1 Perks */}
          <Flex
            align="center"
            borderRadius={4}
            width="100%"
            height="45px"
            justify="center"
          >
            {AllPerkData.filter((p) => p.tierLevel === 1).map((perk) => (
              <PerkIcon
                key={perk.perkName}
                perkData={perk}
                onPerkClicked={onPerkIconClicked}
                hasPerkPoints={perkPoints > 0}
                viewBroPage={false}
              ></PerkIcon>
            ))}
          </Flex>
          {/*Tier 2 Perks */}
          <Flex
            align="center"
            borderRadius={4}
            width="100%"
            height="45px"
            justify="center"
          >
            {AllPerkData.filter((p) => p.tierLevel === 2).map((perk) => (
              <PerkIcon
                key={perk.perkName}
                perkData={perk}
                onPerkClicked={onPerkIconClicked}
                hasPerkPoints={perkPoints > 0}
                viewBroPage={false}
              ></PerkIcon>
            ))}
          </Flex>
          {/*Tier 3 Perks */}
          <Flex
            align="center"
            borderRadius={4}
            width="100%"
            height="45px"
            justify="center"
          >
            {AllPerkData.filter((p) => p.tierLevel === 3).map((perk) => (
              <PerkIcon
                key={perk.perkName}
                perkData={perk}
                onPerkClicked={onPerkIconClicked}
                hasPerkPoints={perkPoints > 0}
                viewBroPage={false}
              ></PerkIcon>
            ))}
          </Flex>
          {/*Tier 4 Perks */}
          <Flex
            align="center"
            borderRadius={4}
            width="100%"
            height="45px"
            justify="center"
          >
            {AllPerkData.filter((p) => p.tierLevel === 4).map((perk) => (
              <PerkIcon
                key={perk.perkName}
                perkData={perk}
                onPerkClicked={onPerkIconClicked}
                hasPerkPoints={perkPoints > 0}
                viewBroPage={false}
              ></PerkIcon>
            ))}
          </Flex>
          {/*Tier 5 Perks */}
          <Flex
            align="center"
            borderRadius={4}
            width="100%"
            height="45px"
            justify="center"
          >
            {AllPerkData.filter((p) => p.tierLevel === 5).map((perk) => (
              <PerkIcon
                key={perk.perkName}
                perkData={perk}
                onPerkClicked={onPerkIconClicked}
                hasPerkPoints={perkPoints > 0}
                viewBroPage={false}
              ></PerkIcon>
            ))}
          </Flex>
          {/*Tier 6 Perks */}
          <Flex
            align="center"
            borderRadius={4}
            width="100%"
            height="45px"
            justify="center"
          >
            {AllPerkData.filter((p) => p.tierLevel === 6).map((perk) => (
              <PerkIcon
                key={perk.perkName}
                perkData={perk}
                onPerkClicked={onPerkIconClicked}
                hasPerkPoints={perkPoints > 0}
                viewBroPage={false}
              ></PerkIcon>
            ))}
          </Flex>
          {/*Tier 7 Perks */}
          <Flex
            align="center"
            borderRadius={4}
            width="100%"
            height="45px"
            justify="center"
          >
            {AllPerkData.filter((p) => p.tierLevel === 7).map((perk) => (
              <PerkIcon
                key={perk.perkName}
                perkData={perk}
                onPerkClicked={onPerkIconClicked}
                hasPerkPoints={perkPoints > 0}
                viewBroPage={false}
              ></PerkIcon>
            ))}
          </Flex>
        </Flex>

        {/* Stats + Avatar Row */}
        <Flex
          justifyContent="space-evenly"
          bg="gray.100"
          borderRadius={4}
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
            width="30%"
            height="90%"
            justify="center"
          >
            Avatar
          </Flex>
          {/*Items */}
          <Flex
            align="top"
            bg="white"
            borderRadius={4}
            width="30%"
            height="90%"
            justify="center"
            direction="column"
          >
            {/*Top Row */}
            <Flex
              width="100%"
              height="33.3%"
              borderColor="red"
              borderWidth="2px"
              justifyContent="center"
              align="center"
            >
              <ItemSlot height="75px" width="75px" slotType="Trinket" />
              <ItemSlot height="75px" width="75px" slotType="Head" />
              <ItemSlot height="75px" width="75px" />
            </Flex>

            {/* Middle Row */}
            <Flex
              width="100%"
              height="33.3%"
              borderColor="red"
              borderWidth="2px"
              justifyContent="center"
              align="center"
            >
              <ItemSlot height="75px" width="75px" />
              <ItemSlot height="75px" width="75px" />
              <ItemSlot height="75px" width="75px" />
            </Flex>

            {/* Bottom Row */}
            <Flex
              width="100%"
              height="33.3%"
              borderColor="red"
              borderWidth="2px"
              justifyContent="center"
              align="center"
            >
              <ItemSlot height="75px" width="75px" />
              <ItemSlot height="75px" width="75px" />
              <ItemSlot height="75px" width="75px" />
              <ItemSlot height="75px" width="75px" />
            </Flex>
          </Flex>
          {/*Stats*/}
          {/*Colums + Header Text Fitter*/}
          <Flex
            direction="column"
            justify="center"
            align="center"
            height="100%"
          >
            {/* Columns Fitter*/}
            <Text width={"100%"} textAlign="center">
              Minimum Attribute Levels
            </Text>

            <Flex
              align="center"
              bg="white"
              borderRadius={4}
              width="100%"
              height="80%"
              justify="center"
            >
              {/*Stat Column 1*/}
              <Flex
                align="center"
                bg="white"
                borderRadius={4}
                width="50%"
                height="90%"
                justify="start"
                direction="column"
              >
                <AttributeRow
                  onAttributeValueChanged={setHealth}
                  attributeData={getAttributeData("Health")}
                  viewBroPage={false}
                ></AttributeRow>
                <AttributeRow
                  onAttributeValueChanged={setFatigue}
                  attributeData={getAttributeData("Fatigue")}
                  viewBroPage={false}
                ></AttributeRow>
                <AttributeRow
                  onAttributeValueChanged={setResolve}
                  attributeData={getAttributeData("Resolve")}
                  viewBroPage={false}
                ></AttributeRow>
                <AttributeRow
                  onAttributeValueChanged={setInitiative}
                  attributeData={getAttributeData("Initiative")}
                  viewBroPage={false}
                ></AttributeRow>
              </Flex>
              {/*Stat Column 2*/}
              <Flex
                align="center"
                bg="white"
                borderRadius={4}
                width="50%"
                height="90%"
                justify="start"
                direction="column"
              >
                <AttributeRow
                  onAttributeValueChanged={setMeleeAttack}
                  attributeData={getAttributeData("Melee Attack")}
                  viewBroPage={false}
                ></AttributeRow>
                <AttributeRow
                  onAttributeValueChanged={setRangedAttack}
                  attributeData={getAttributeData("Ranged Attack")}
                  viewBroPage={false}
                ></AttributeRow>
                <AttributeRow
                  onAttributeValueChanged={setMeleeDefence}
                  attributeData={getAttributeData("Melee Defence")}
                  viewBroPage={false}
                ></AttributeRow>
                <AttributeRow
                  onAttributeValueChanged={setRangedDefence}
                  attributeData={getAttributeData("Ranged Defence")}
                  viewBroPage={false}
                ></AttributeRow>
              </Flex>
            </Flex>
          </Flex>
        </Flex>

        {/* Description Row*/}
        <Flex
          align="center"
          direction={"column"}
          borderRadius={4}
          width="100%"
          height="200px"
          justify="start"
          bg="gray.100"
        >
          <Text m={2}>Build Description</Text>
          <Textarea
            placeholder="Tell us about this build ! What are it's strengths and weaknesses?"
            size="sm"
            height={"90%"}
            width={"90%"}
            resize={"vertical"}
            mb={5}
            bg="white"
            onChange={handleDescriptionChange}
          />
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
    </Flex>
  );
};
export default CreateBroPage;
