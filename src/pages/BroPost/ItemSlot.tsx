import {
  Box,
  Flex,
  Image,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Spacer,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  AllItemData,
  ItemData,
  ItemSlotType,
} from "../../data controllers/ItemDataController";
import ItemSelectTab from "./ItemSelectTab";

type ItemSlotProps = {
  height: string;
  width: string;
  slotType?: ItemSlotType;
};

const ItemSlot: React.FC<ItemSlotProps> = ({ height, width, slotType }) => {
  const [item, setItem] = useState<ItemData>();

  const clearItem = () => {
    setItem(undefined);
  };

  const onItemRowClicked = (item: ItemData) => {
    setItem(item);
  };
  const getImgSrc = () => {
    if (slotType === "Chest") return "/images/Item_Slots/Chest.png";
    else if (slotType === "Head") return "/images/Item_Slots/Head.png";
    else if (slotType === "MainHand") return "/images/Item_Slots/Main.png";
    else if (slotType === "Trinket") return "/images/Item_Slots/Trinket.png";
    else if (slotType === "OffHand") return "/images/Item_Slots/Shield.png";
    else if (slotType === "Inventory") return "/images/Item_Slots/OpenSlot.png";
  };
  return (
    <Flex
      height={height}
      width={width}
      borderColor="blue"
      borderWidth="1px"
      align="center"
      justify="center"
      m={2}
    >
      <Popover trigger="click" closeDelay={0}>
        <PopoverTrigger>
          <Image
            alt=""
            src={item ? item.itemIconImage : getImgSrc()}
            width="80px"
            height="80px"
            objectFit={"cover"}
          ></Image>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />

          <PopoverBody>
            {" "}
            <Box maxH={"250px"} overflowY="auto">
              <Flex
                height="40px"
                width="100%"
                justify="flex-start"
                align={"center"}
                onClick={clearItem}
              >
                <Text>Empty</Text>
              </Flex>
              {AllItemData.map((item) => (
                <ItemSelectTab
                  key={item.itemName}
                  itemData={item}
                  onTabClicked={onItemRowClicked}
                ></ItemSelectTab>
              ))}
            </Box>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};
export default ItemSlot;
