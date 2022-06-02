import { Button, Flex, Icon, Input } from "@chakra-ui/react";
import React from "react";

type BroSearchFilterPanelProps = {};

const BroSearchFilterPanel: React.FC<BroSearchFilterPanelProps> = () => {
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
        <Input
          placeholder="Search for a bro..."
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
        />
      </Flex>
      <Flex
        justify="space-between"
        align="center"
        bg="white"
        height="60px"
        borderColor="gray.300"
        width="100%"
        p={3}
      >
        <Button width="150px">New</Button>
        <Button width="150px">Popular (All Time)</Button>
        <Button width="150px">Popular (30 Days)</Button>
      </Flex>
    </Flex>
  );
};
export default BroSearchFilterPanel;
