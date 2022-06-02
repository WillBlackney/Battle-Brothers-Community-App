import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";

import { auth } from "../../firebase/clientApp";
import RightContent from "./RightContent";
import SearchInput from "./SearchInput";
import router from "next/router";
import BroSearchTab from "./BroSearchTab";
import CreateBroTab from "./CreateBroTab";
import Router from "next/router";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  return (
    <Flex
      bg="white"
      height="44px"
      padding="6px 12px"
      justifyContent={{ md: "space-between" }}
    >
      <Flex
        align="center"
        width={{ base: "40px", md: "auto" }}
        mr={{ base: 0, md: 2 }}
        cursor="pointer"
      >
        <Image src="/images/battle_brothers_logo_1.png" height="30px" mr={4} />
        <Text fontWeight="600" mr={20} onClick={() => Router.push("/")}>
          Battle Brothers Tavern
        </Text>
        <BroSearchTab></BroSearchTab>
        <CreateBroTab></CreateBroTab>
      </Flex>
      <RightContent user={user as User} />
    </Flex>
  );
};
export default Navbar;
