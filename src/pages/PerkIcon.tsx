import React, { useState } from "react";
import { PerkData } from "../data controllers/PerkDataController";
import {
  Flex,
  Image,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  Spacer,
} from "@chakra-ui/react";

// Props
type PerkIconProps = {
  perkData?: PerkData;
  onPerkClicked?(perkDataClicked: PerkData): void;
  hasPerkPoints?: boolean;
  viewBroPage: boolean;
};

const PerkIcon: React.FC<PerkIconProps> = ({
  perkData,
  onPerkClicked,
  hasPerkPoints,
  viewBroPage,
}) => {
  // State
  const [selected, setSelected] = useState(viewBroPage);
  const [mousedOver, setMousedOver] = useState(false);

  // Mouse Events
  const mouseEnter = () => {
    setMousedOver(true);
  };
  const mouseExit = () => {
    setMousedOver(false);
  };
  const mouseClick = () => {
    console.log("PerkIcon.mouseClick(): ", perkData?.perkName);

    // Click logic not relevant when not on the 'view bro post' page, return
    if (viewBroPage) return;

    // If selected, handle deselect (remove perk + refund a perk point)
    if (selected) {
      setSelected(false);
      setMousedOver(false);
    } else if (!selected) {
      if (
        // Student is a free perk (it get refunded at level 10), so don't modify perk points when its selected/deselected
        perkData?.perkName === "Student" ||
        (perkData?.perkName !== "Student" && hasPerkPoints)
      ) {
        setSelected(true);
        setMousedOver(false);
      }
    }

    // Handle select perk, if on 'build bro' page
    if (onPerkClicked && perkData) onPerkClicked(perkData);
  };
  return (
    <>
      <Popover trigger="hover" closeDelay={0}>
        <PopoverTrigger>
          <Image
            align={"center"}
            cursor={!viewBroPage && "pointer"}
            onClick={mouseClick}
            onMouseEnter={mouseEnter}
            onMouseLeave={mouseExit}
            height="35px"
            width={"35px"}
            m={1}
            src={perkData?.perkImageURL}
            style={
              selected || mousedOver
                ? { filter: "grayscale(0%)" }
                : { filter: "grayscale(100%)" }
            }
          ></Image>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverHeader>
            <Flex width={"100%"} justify="center" align={"center"}>
              {" "}
              {perkData?.perkName} <Spacer />
              <Image
                height="30px"
                width={"30px"}
                src={perkData?.perkImageURL}
              ></Image>
            </Flex>
          </PopoverHeader>

          <PopoverBody>{perkData?.description}</PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};
export default PerkIcon;
