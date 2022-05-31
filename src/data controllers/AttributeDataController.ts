export const AllAttributeData: AttributeData[] = [
  {
    attributeName: "Health",
    iconImageURL: "/images/Attribute_Icons/Health.png",
    description:
      "Hitpoints (HP) represent the health of a character. If this attribute falls to 0, the character is killed or struck down.",
  },
  {
    attributeName: "Fatigue",
    iconImageURL: "/images/Attribute_Icons/Fatigue.png",
    description:
      "Fatigue determines how exhausted a character is. Using either skills or movement will not only use up Action Points, but will also build up Fatigue. A character will not able to move or execute any skills, if too much Fatigue is accumulated.",
  },
  {
    attributeName: "Resolve",
    iconImageURL: "/images/Attribute_Icons/Resolve.png",
    description:
      "Resolve represents the willpower and bravery of characters. High Resolve makes it less likely that characters fall to lower morale states due to negative events and the more likely that characters gain confidence from positive events. Resolve acts as defense against certain mental attacks that inflict panic, fear or mind control.",
  },
  {
    attributeName: "Initiative",
    iconImageURL: "/images/Attribute_Icons/Initiative.png",
    description:
      "Initiative is a secondary attribute that determines turn order of characters on the battlefield. The higher this value, the earlier the position in the turn order. In general, someone in light armor will act before someone in heavy armor, and someone fresh will act before someone fatigued.",
  },
  {
    attributeName: "Melee Attack",
    iconImageURL: "/images/Attribute_Icons/Melee_Attack.png",
    description:
      "Melee Skill determines the base probability of hitting a target with a melee attack, such as with swords and spears. Can be increased as the character gains experience.",
  },
  {
    attributeName: "Ranged Attack",
    iconImageURL: "/images/Attribute_Icons/Ranged_Attack.png",
    description:
      "Ranged Skill determines the base probability of hitting a target with a ranged attack. It defines a hit chance for bows, crossbows, handgonne, firelance and all sort of throwing weapons.",
  },
  {
    attributeName: "Melee Defence",
    iconImageURL: "/images/Attribute_Icons/Melee_Defence.png",
    description:
      "Melee Defense reduces the probability of being hit by melee attacks. ",
  },
  {
    attributeName: "Ranged Defence",
    iconImageURL: "/images/Attribute_Icons/Ranged_Defence.png",
    description:
      "Ranged Defense reduces the probability of being hit with a ranged attack, such as an arrow shot from afar.",
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
