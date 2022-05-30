export const AllAttributeData: AttributeData[] = [
  {
    attributeName: "Health",
    iconImageURL: "/images/Attribute_Icons/Health.png",
    description: "",
  },
  {
    attributeName: "Fatigue",
    iconImageURL: "/images/Attribute_Icons/Fatigue.png",
    description: "",
  },
  {
    attributeName: "Resolve",
    iconImageURL: "/images/Attribute_Icons/Resolve.png",
    description: "",
  },
  {
    attributeName: "Initiative",
    iconImageURL: "/images/Attribute_Icons/Initiative.png",
    description: "",
  },
  {
    attributeName: "Melee Attack",
    iconImageURL: "/images/Attribute_Icons/Melee_Attack.png",
    description: "",
  },
  {
    attributeName: "Ranged Attack",
    iconImageURL: "/images/Attribute_Icons/Ranged_Attack.png",
    description: "",
  },
  {
    attributeName: "Melee Defence",
    iconImageURL: "/images/Attribute_Icons/Melee_Defence.png",
    description: "",
  },
  {
    attributeName: "Ranged Defence",
    iconImageURL: "/images/Attribute_Icons/Ranged_Defence.png",
    description: "",
  },
];

export function getAttributeData(
  attributeName: string
): AttributeData | undefined {
  //console.log("getAttributeData() searching for attribute: " + attributeName);
  return AllAttributeData.find((i) => i.attributeName == attributeName);
}

export interface AttributeData {
  attributeName: string;
  iconImageURL?: string;
  description?: string;
}
