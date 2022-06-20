import { Flex, Text } from "@chakra-ui/react";
import React, { Dispatch, SetStateAction } from "react";
import { ItemData } from "../../data controllers/ItemDataController";

type ItemSelectTabProps = {
  itemData?: ItemData;
  onTabClicked?(itemDataClicked: ItemData): void;
};

const ItemSelectTab: React.FC<ItemSelectTabProps> = ({
  itemData,
  onTabClicked,
}) => {
  const mouseClick = () => {
    console.log("PerkIcon.mouseClick(): ");
    if (itemData && onTabClicked) onTabClicked(itemData);
  };
  return (
    <Flex
      height="40px"
      width="100%"
      justify="flex-start"
      align={"center"}
      onClick={mouseClick}
    >
      <Text>{itemData ? itemData.itemName : "(Empty)"}</Text>
    </Flex>
  );
};
export default ItemSelectTab;
