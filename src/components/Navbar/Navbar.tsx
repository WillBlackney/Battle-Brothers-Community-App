import React from "react";
import { Box, Flex, Image, Text } from "@chakra-ui/react";
import { User } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { useSetRecoilState } from "recoil";
import {
  defaultMenuItem,
  directoryMenuState,
} from "../../atoms/directoryMenuAtom";
import { auth } from "../../firebase/clientApp";
import Directory from "./Directory/Directory";
import RightContent from "./RightContent";
import SearchInput from "./SearchInput";
import router from "next/router";
import useDirectory from "../../hooks/useDirectory";
import BroSearchTab from "./BroSearchTab";
import CreateBroTab from "./CreateBroTab";
import Router from "next/router";

const Navbar: React.FC = () => {
  const [user] = useAuthState(auth);

  // Use <Link> for initial build; implement directory logic near end
  const { onSelectMenuItem } = useDirectory();

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
        <Text fontWeight="600" mr={20} 
        onClick={() => Router.push("/")}>
          Battle Brothers Tavern
        </Text>
        <BroSearchTab></BroSearchTab>
        <CreateBroTab></CreateBroTab>
      </Flex>
      <Directory></Directory>
      {/*user && <Directory />*/}
      {/*<SearchInput user={user as User} />*/}
      <RightContent user={user as User} />
    </Flex>
  );
};
export default Navbar;
