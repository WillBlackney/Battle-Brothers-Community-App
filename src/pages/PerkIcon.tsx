import React, { useState } from "react";
import { PerkData } from "../data controllers/PerkDataController";
import { Image } from "@chakra-ui/react";
type PerkIconProps = {
  perkData?: PerkData;
  onPerkClicked?(perkDataClicked: PerkData): void;
  hasPerkPoints: boolean;
};

const PerkIcon: React.FC<PerkIconProps> = ({
  perkData,
  onPerkClicked,
  hasPerkPoints,
}) => {
  const [selected, setSelected] = useState(false);
  const [mousedOver, setMousedOver] = useState(false);

  const mouseEnter = () => {
    setMousedOver(true);
  };
  const mouseExit = () => {
    setMousedOver(false);
  };
  const mouseClick = () => {
    console.log("PerkIcon.mouseClick(): ", perkData?.perkName);
    if (selected) {
      setSelected(false);
      setMousedOver(false);
    } else if (!selected) {
      if (
        perkData?.perkName === "Student" ||
        (perkData?.perkName !== "Student" && hasPerkPoints)
      ) {
        setSelected(true);
        setMousedOver(false);
      }
    }

    if (onPerkClicked && perkData) onPerkClicked(perkData);
  };
  return (
    <>
      <Image
        onClick={mouseClick}
        onMouseEnter={mouseEnter}
        onMouseLeave={mouseExit}
        height="100%"
        m={1}
        src={perkData?.perkImageURL}
        style={
          selected || mousedOver
            ? { filter: "grayscale(0%)" }
            : { filter: "grayscale(100%)" }
        }
      ></Image>
    </>
  );
};
export default PerkIcon;
