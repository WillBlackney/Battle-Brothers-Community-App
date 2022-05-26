import React from "react";
import { Flex, Button } from "@chakra-ui/react";
import Link from "next/link";

const BroPostPageNotFound: React.FC = () => {
  return (
    <Flex
      direction="column"
      justifyContent="center"
      alignItems="center"
      minHeight="60vh"
      textColor={'white'}
    >
      Sorry, this bro build does not exist or has been deleted.
      <Link href="/">
        <Button mt={4}>GO HOME</Button>
      </Link>
    </Flex>
  );
};
export default BroPostPageNotFound;
