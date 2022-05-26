import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface BroBuild {
  uid: string;
  buildName: string;
  creatorId: string;
  createdAt?: Timestamp;
  // to do: perks, stats, etc etc
}

export type BroBuildVote = {
  uid?: string;
  postId: string;
  voteValue: number;
};

interface BroBuildState {
  selectedPost: BroBuild | null;
  allBroBuilds: BroBuild[];
  postVotes: BroBuildVote[];
  postsCache: {
    [key: string]: BroBuild[];
  };
  postUpdateRequired: boolean;
}

export const defaultBroBuildState: BroBuildState = {
  selectedPost: null,
  allBroBuilds: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const broBuildState = atom({
  key: "broBuildState",
  default: defaultBroBuildState,
});
