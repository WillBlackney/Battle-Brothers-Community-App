import { Flex, Image, Text, Icon } from "@chakra-ui/react";
import { Search2Icon, SunIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import CreateCommunityModal from "../Modal/CreateCommunity/CreateCommunityModal";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import { auth } from "../../firebase/clientApp";
import Router from "next/router";

const CreateBroTab: React.FC = () => {
  const [user] = useAuthState(auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <Flex
        onClick={() => Router.push("/CreateBroPage")}
        height="44px"
        width="150px"
        marginLeft={5}
        alignItems="center"
        textAlign="start"
      >
        <SunIcon fontSize="15px" ml={1} mr={2}></SunIcon>
        <Text width="100%">Create Bro</Text>
      </Flex>
    </>
  );
};
export default CreateBroTab;
