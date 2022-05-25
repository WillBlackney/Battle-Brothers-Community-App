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
      console.log(uniqueId);
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
          width="100%"
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
  );
};
export default CreateBroPage;
