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
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { v4 as uuidv4 } from "uuid";
import PageContentLayout from "../components/Layout/PageContent";

type CreateBroPageProps = {};

const CreateBroPage: React.FC<CreateBroPageProps> = () => {
  const [user] = useAuthState(auth);
  const [buildName, setBuildName] = useState("");
  const [charsRemaining, setCharsRemaining] = useState(21);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePublishBroBuild = async () => {
    // validate build name
    const format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (buildName.length < 3) {
      return setError(
        //"Build name must be between 3–21 characters, and can only contain letters, numbers, or underscores."
        "Build name must be between 3–21 characters."
      );
    }

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
        align="center"
        bg="gray.100"
        borderRadius={4}
        borderColor="red"
        borderWidth="2px"
        width="100%"
        height="500px"
        justify="center"
        mb={4}
      >
        PERKS
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
          Stats
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
