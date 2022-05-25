import { Flex, Image, Text, Icon } from "@chakra-ui/react";
import { Search2Icon, CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";
import Router from "next/router";

const BroSearchTab: React.FC = () => {
  return (
    <Flex
      onClick={() => Router.push("/")}
      height="44px"
      width="150px"
      marginLeft={5}
      alignItems="center"
      textAlign="start"
    >
      <Search2Icon fontSize="15px" ml={1} mr={2}></Search2Icon>
      <Text width="100%">Bro Search</Text>
    </Flex>
  );
};
export default BroSearchTab;
