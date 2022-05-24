import { Flex, Button, Image } from "@chakra-ui/react";
import React from "react";

const OAuthButtons: React.FC = () => {
  return (
    <Flex direction="column" mb={4} width="100%">
      <Button variant="oauth" mb={2}>
        <Image height="20px" mr={4} src="/images/googlelogo.png" />
        Continue with Google
      </Button>
    </Flex>
  );
};
export default OAuthButtons;
