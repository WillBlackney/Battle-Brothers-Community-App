import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  writeBatch,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilState, useSetRecoilState } from "recoil";
import { authModalState } from "../atoms/AuthModalAtom";
import { BroBuild, broBuildState, BroBuildVote } from "../atoms/broBuildsAtom";
import { auth, firestore, storage } from "../firebase/clientApp";

const useBroBuilds = () => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [broBuildsStateValue, setBroBuildsStateValue] =
    useRecoilState(broBuildState);

  const onVoteBroBuild = async (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    broBuild: BroBuild,
    vote: number
  ) => {
    console.log("onVoteBroBuild() called...");
    event.stopPropagation();

    // if no logged in user, open sign in modal
    if (!user?.uid) {
      setAuthModalState({ open: true, view: "login" });
      return;
    }
    
    try {
      const { voteStatus } = broBuild;
      const existingVote = broBuildsStateValue.postVotes.find(
        (vote) => vote.broBuildId === broBuild.id
      );

      console.log("existing vote: ", existingVote);

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
          broBuildId: broBuild.id!,
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
            (vote) => vote.id === existingVote.id
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
        (item) => item.id === broBuild.id
      );
      updatedBroBuilds[postIndex] = updatedBroBuild;

      // Update bro builds global state
      setBroBuildsStateValue((prev) => ({
        ...prev,
        allBroBuilds: updatedBroBuilds,
        postVotes: updatedBroBuildVotes,
      }));

      const postRef = doc(firestore, "brobuilds", broBuild.id!);
      batch.update(postRef, { voteStatus: voteStatus + voteChange });

      await batch.commit();
    } catch (error) {
      console.log("onVoteBroBuild error: ", error);
    }
  };

  const onSelectBroBuild = (broBuild: BroBuild) => {
    setBroBuildsStateValue((prev) => ({
      ...prev,
      selectedBroBuild: broBuild,
    }));
    router.push(`BroPost/${broBuild.id}`);
  };

  const onDeleteBroBuild = async (broBuild: BroBuild): Promise<boolean> => {
    console.log("DELETING BRO BUILD: ", broBuild.id);

    try {
      // delete post from posts collection
      const postDocRef = doc(firestore, "brobuilds", broBuild.id);
      await deleteDoc(postDocRef);

      // Update post state
      setBroBuildsStateValue((prev) => ({
        ...prev,
        allBroBuilds: prev.allBroBuilds.filter(
          (item) => item.id !== broBuild.id
        ),
      }));

      /**
       * Cloud Function will trigger on post delete
       * to delete all comments with postId === post.id
       */
      return true;
    } catch (error) {
      console.log("THERE WAS AN ERROR", error);
      return false;
    }
  };

  const getUserBroBuildVotes = async () => {
    console.log("getUserBroBuildVotes()");
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
    if (!user || !broBuildsStateValue.selectedBroBuild) return;
    getUserBroBuildVotes();
  }, [user, broBuildsStateValue.selectedBroBuild]);

  useEffect(() => {
    if (!user) return;
    getUserBroBuildVotes();
  }, []);

  useEffect(() => {
    // Clear post votes when user logs out
    if (!user) {
      setBroBuildsStateValue((prev) => ({
        ...prev,
        postVotes: [],
      }));
    }
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
