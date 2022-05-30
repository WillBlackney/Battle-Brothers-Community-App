import React, { useState } from "react";
import { PerkData } from "../data controllers/PerkDataController";
import { Image } from "@chakra-ui/react";
type PerkIconProps = {
  perkData?: PerkData;
  onPerkClicked?(perkDataClicked: PerkData): void;
};

const PerkIcon: React.FC<PerkIconProps> = ({ perkData, onPerkClicked }) => {
  const [selected, setSelected] = useState(false);
  return (
    <>
      <Image
        height="100%"
        m={1}
        src={perkData?.perkImageURL}
        style={!selected ? { filter: "grayscale(100%)" } : {}}
      ></Image>
    </>
  );
};
export default PerkIcon;
