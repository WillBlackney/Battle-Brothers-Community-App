import { Flex, Text } from "@chakra-ui/react";
import { SunIcon } from "@chakra-ui/icons";
import React, { useState } from "react";
import Router from "next/router";

const CreateBroTab: React.FC = () => {
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
