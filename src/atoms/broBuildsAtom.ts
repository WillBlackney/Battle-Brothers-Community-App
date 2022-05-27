import { Timestamp } from "firebase/firestore";
import { atom } from "recoil";

export interface BroBuild {
  uid: string;
  buildName: string;
  creatorId: string;
  createdAt?: Timestamp;
  voteStatus: number;
  numberOfComments: number;
  currentUserVoteStatus?: {
    id: string;
    voteValue: number;
  };
  // to do: perks, stats, etc etc
}

export type BroBuildVote = {
  id?: string;
  broBuildId: string;
  voteValue: number;
};

interface BroBuildState {
  selectedBroBuild: BroBuild | null;
  allBroBuilds: BroBuild[];
  postVotes: BroBuildVote[];
  postsCache: {
    [key: string]: BroBuild[];
  };
  postUpdateRequired: boolean;
}

export const defaultBroBuildState: BroBuildState = {
  selectedBroBuild: null,
  allBroBuilds: [],
  postVotes: [],
  postsCache: {},
  postUpdateRequired: true,
};

export const broBuildState = atom({
  key: "broBuildState",
  default: defaultBroBuildState,
});
