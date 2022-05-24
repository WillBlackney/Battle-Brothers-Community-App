import { Flex, Image, Text, Icon } from "@chakra-ui/react";
import { Search2Icon, SunIcon } from "@chakra-ui/icons";
import React from "react";

const CreateBroTab: React.FC = () => {
    return (
        <Flex
          height="44px"
          width="150px"
          marginLeft={5}
          alignItems="center"
          textAlign="start"
        >
          <SunIcon fontSize="15px" ml={1} mr={2}></SunIcon>
          <Text width='100%'>Create Bro</Text>
        </Flex>
      );
    };
export default CreateBroTab;