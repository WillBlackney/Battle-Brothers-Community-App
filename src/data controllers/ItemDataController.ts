export interface ItemData {
  itemName: string;
  itemIconImage?: string;
  itemAvatarImage?: string;
  requiredSlot: ItemSlotType;
}

export type ItemSlotType =
  | "Chest"
  | "Head"
  | "MainHand"
  | "OffHand"
  | "Trinket"
  | "Inventory";

export const AllItemData: ItemData[] = [
  {
    itemName: "Rondel Dagger",
    itemIconImage: "/images/Items/Weapons/RondelDagger.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Greatsword",
    itemIconImage: "/images/Items/Weapons/Greatsword.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Two Handed Mace",
    itemIconImage: "/images/Items/Weapons/TwoHandedFlangedMace.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Warbrand",
    itemIconImage: "/images/Items/Weapons/Warbrand.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Winged Mace",
    itemIconImage: "/images/Items/Weapons/WingedMace.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },

  {
    itemName: "Axe Hammer",
    itemIconImage: "/images/Items/Weapons/AxeHammer.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Banner",
    itemIconImage: "/images/Items/Weapons/Banner.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Bardiche",
    itemIconImage: "/images/Items/Weapons/Bardiche.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Berserk Chain",
    itemIconImage: "/images/Items/Weapons/BerserkChain.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Billhook",
    itemIconImage: "/images/Items/Weapons/Billhook.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },

  {
    itemName: "Crypt Cleaver",
    itemIconImage: "/images/Items/Weapons/CryptCleaver.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Fencing Sword",
    itemIconImage: "/images/Items/Weapons/FencingSword.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Fighting Axe",
    itemIconImage: "/images/Items/Weapons/FightingAxe.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Fighting Spear",
    itemIconImage: "/images/Items/Weapons/FightingSpear.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Firelance",
    itemIconImage: "/images/Items/Weapons/Firelance.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },

  {
    itemName: "Flail",
    itemIconImage: "/images/Items/Weapons/Flail.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Goblin Pike",
    itemIconImage: "/images/Items/Weapons/GoblinPike.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Goedendag",
    itemIconImage: "/images/Items/Weapons/Goedendag.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Great Axe",
    itemIconImage: "/images/Items/Weapons/GreatAxe.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Head Chopper",
    itemIconImage: "/images/Items/Weapons/HeadChopper.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Head Splitter",
    itemIconImage: "/images/Items/Weapons/HeadSplitter.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Heavy Rusty Axe",
    itemIconImage: "/images/Items/Weapons/HeavyRustyAxe.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Kopesh",
    itemIconImage: "/images/Items/Weapons/Kopesh.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Long Axe",
    itemIconImage: "/images/Items/Weapons/LongAxe.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Man Splitter",
    itemIconImage: "/images/Items/Weapons/ManSplitter.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },

  {
    itemName: "Military Cleaver",
    itemIconImage: "/images/Items/Weapons/MilitaryCleaver.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Noble Sword",
    itemIconImage: "/images/Items/Weapons/NobleSword.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Polehammer",
    itemIconImage: "/images/Items/Weapons/Polehammer.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Qatal Dagger",
    itemIconImage: "/images/Items/Weapons/Qatal_Dagger.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Rusty Warblade",
    itemIconImage: "/images/Items/Weapons/RustyWarblade.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Swordlance",
    itemIconImage: "/images/Items/Weapons/Swordlance.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Three Headed Flail",
    itemIconImage: "/images/Items/Weapons/ThreeHeadedFlail.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Two Handed Flail",
    itemIconImage: "/images/Items/Weapons/TwoHandedFlail.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Two Handed Hammer",
    itemIconImage: "/images/Items/Weapons/TwoHandedHammer.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Two Handed Scimitar",
    itemIconImage: "/images/Items/Weapons/TwoHandedScimitar.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
  {
    itemName: "Whip",
    itemIconImage: "/images/Items/Weapons/Whip.png",
    itemAvatarImage: "",
    requiredSlot: "MainHand",
  },
];
