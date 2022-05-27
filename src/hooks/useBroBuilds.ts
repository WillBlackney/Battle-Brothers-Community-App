import {
  collection,
  doc,
  getDocs,
  query,
  writeBatch,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState } from "recoil";
import { BroBuild, broBuildState, BroBuildVote } from "../atoms/broBuildsAtom";
import { auth, firestore, storage } from "../firebase/clientApp";

const useBroBuilds = () => {
  const [user] = useAuthState(auth);
  const [broBuildsStateValue, setBroBuildsStateValue] =
    useRecoilState(broBuildState);

  const onVoteBroBuild = async (broBuild: BroBuild, vote: number) => {
    try {
      const { voteStatus } = broBuild;
      const existingVote = broBuildsStateValue.postVotes.find(
        (vote) => vote.broBuildId === broBuild.uid
      );

      const batch = writeBatch(firestore);
      const updatedBroBuild = { ...broBuild };
      const updatedBroBuilds = [...broBuildsStateValue.allBroBuilds];
      let updatedBroBuildVotes = [...broBuildsStateValue.postVotes];
      let voteChange = vote;

      // New vote
      if (!existingVote) {
        // create new bro build vote doc
        const broBuildVoteRef = doc(
          collection(firestore, "users", `${user?.uid}/broBuildVotes`)
        );

        const newVote: BroBuildVote = {
          id: broBuildVoteRef.id,
          broBuildId: broBuild.uid!,
          voteValue: vote,
        };

        batch.set(broBuildVoteRef, newVote);
        // Add or subtract 1 from the build
        updatedBroBuild.voteStatus = voteStatus + vote;
        updatedBroBuildVotes = [...updatedBroBuildVotes, newVote];
      } else {
        const broBuildVoteRef = doc(
          firestore,
          "users",
          `${user?.uid}/broBuildVotes/${existingVote.id}`
        );
        // User is removing/camcelling their previous vote
        if (existingVote.voteValue === vote) {
          updatedBroBuild.voteStatus = voteStatus - vote;
          updatedBroBuildVotes = updatedBroBuildVotes.filter(
            (vote) => vote.id !== existingVote.id
          );
          // Delete the vote data from DB
          batch.delete(broBuildVoteRef);
          voteChange *= -1;
        }

        // Flipping the vote from upvote to downvote, or vice versa
        else {
          updatedBroBuild.voteStatus = voteStatus + 2 * vote;
          const voteIndex = broBuildsStateValue.postVotes.findIndex(
            (vote) => vote.id == existingVote.id
          );
          updatedBroBuildVotes[voteIndex] = {
            ...existingVote,
            voteValue: vote,
          };

          batch.update(broBuildVoteRef, {
            voteValue: vote,
          });

          voteChange = 2 * vote;
        }
      }

      // Apply changed bro build to collection of bro builds before commiting
      const postIndex = broBuildsStateValue.allBroBuilds.findIndex(
        (item) => item.uid == broBuild.uid
      );
      updatedBroBuilds[postIndex] = updatedBroBuild;

      // Update bro builds global state
      setBroBuildsStateValue((prev) => ({
        ...prev,
        allBroBuilds: updatedBroBuilds,
        postVotes: updatedBroBuildVotes,
      }));

      const postRef = doc(firestore, "broBuilds", broBuild.uid!);
      batch.update(postRef, { voteStatus: vote + voteChange });

      await batch.commit();
    } catch (error) {}
  };

  const onSelectBroBuild = () => {};

  const onDeleteBroBuild = async () => {};

  const getUserBroBuildVotes = async () => {
    const postVotesQuery = query(
      collection(firestore, "users", `${user?.uid}/broBuildVotes`)
    );

    const postVoteDocs = await getDocs(postVotesQuery);
    const postVotes = postVoteDocs.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setBroBuildsStateValue((prev) => ({
      ...prev,
      postVotes: postVotes as BroBuildVote[],
    }));
  };

  useEffect(() => {
    if (!user) return;
    getUserBroBuildVotes();
  }, [user]);

  return {
    broBuildsStateValue: broBuildsStateValue,
    setBroBuildsStateValue,
    onVoteBroBuild,
    onSelectBroBuild,
    onDeleteBroBuild,
  };
};

export default useBroBuilds;
