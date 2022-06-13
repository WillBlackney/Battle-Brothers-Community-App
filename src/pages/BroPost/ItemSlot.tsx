import { Flex, Image } from "@chakra-ui/react";
import React from "react";

type ItemSlotProps = {
  height: string;
  width: string;
  slotType: SlotType;
};

type SlotType = "Chest" | "Head" | "Main" | "Shield" | "Trinket";

const ItemSlot: React.FC<ItemSlotProps> = ({ height, width, slotType }) => {
  const imgSrc = `"/images/Item_Slots/${slotType}.png"`;
  const getImgSrc = () => {
    if (slotType === "Chest") return "/images/Item_Slots/Chest.png";
    if (slotType === "Head") return "/images/Item_Slots/Head.png";
    if (slotType === "Main") return "/images/Item_Slots/Main.png";
    if (slotType === "Trinket") return "/images/Item_Slots/Trinket.png";
    if (slotType === "Shield") return "/images/Item_Slots/Shield.png";
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
      <Image src={getImgSrc()} width="100%" alt=""></Image>
    </Flex>
  );
};
export default ItemSlot;
