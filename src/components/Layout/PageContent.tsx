import React from "react";
import { Flex } from "@chakra-ui/react";

interface PageContentLayoutProps {
  maxWidth?: string;
}

const PageContentLayout: React.FC<PageContentLayoutProps> = ({
  children,
  maxWidth,
}) => {
  return (
    <Flex justify="center" p="16px 0px">
      <Flex width="95%" justify="center" maxWidth={maxWidth || "860px"}>
        <Flex direction="column" width={{ base: "100%", md: "65%" }}>
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PageContentLayout;
