import { firestore } from "../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import CommentItem, { Comment } from "./CommentItem";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BroBuild, broBuildState } from "../../atoms/broBuildsAtom";
import CommentInput from "./CommentInput";
import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import {
  collection,
  doc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";

// Props
type BuildCommentsProps = {
  user: User;
  selectedPost: BroBuild | null;
};

const BuildComments: React.FC<BuildCommentsProps> = ({
  user,
  selectedPost,
}) => {
  // State
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");

  // Hooks
  const setBroBuildsStateValue = useSetRecoilState(broBuildState);

  // Getters
  const getPostComments = async () => {
    // Get all comments for a build from the DB, then order them chronologically
    try {
      const commentsQuery = query(
        collection(firestore, "comments"),
        where("broBuildId", "==", selectedPost?.id),
        orderBy("createdAt", "desc")
      );
      const commentDocs = await getDocs(commentsQuery);
      const comments = commentDocs.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      // Update client side state with new data from DB
      setComments(comments as Comment[]);
    } catch (error) {
      console.log("getPostComments error:", error);
    }

    // Disable loading GUI
    setFetchLoading(false);
  };

  // Modify Comments
  const onCreateComment = async (comment: string) => {
    try {
      // Set UI loading view state
      setCreateLoading(true);

      // Prepare a new transaction
      const batch = writeBatch(firestore);

      // Get reference to comments table in DB
      const commentDocRef = doc(collection(firestore, "comments"));

      // Prepare new comment data for DB
      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        broBuildId: selectedPost?.id!,
        broBuildTitle: selectedPost?.buildName!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };

      // Create new comment data for the transaction (not published yet)
      batch.set(commentDocRef, newComment);

      // Server side timestamping wont work properly on client, need to set the value here
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      // Find the bro build that owns this comment and increment its comment count.
      const broBuildDocRef = doc(firestore, "brobuilds", selectedPost?.id!);
      batch.update(broBuildDocRef, {
        numberOfComments: increment(1),
      });

      // Start the transaction and push to the DB!
      await batch.commit();

      // Clear user 'enter a comment' input field
      setCommentText("");

      // Update comments feed below the post with the new comment
      setComments((prev) => [newComment, ...prev]);

      // Update client side state after DB changes
      setBroBuildsStateValue((prev) => ({
        ...prev,
        selectedBroBuild: {
          ...prev.selectedBroBuild,
          numberOfComments: prev.selectedBroBuild?.numberOfComments! + 1,
        } as BroBuild,
      }));
    } catch (error) {
      console.log("onCreateComment error: ", error);
    }
    // Disable loading UI views
    setCreateLoading(false);
  };
  const onDeleteComment = async (comment: any) => {
    setLoadingDeleteId(comment.id);
    try {
      // Setup new transaction
      const batch = writeBatch(firestore);

      // Delete comment
      const commentDocRef = doc(firestore, "comments", comment.id);
      batch.delete(commentDocRef);

      // Update bro build data where comment was
      const broBuildDocRef = doc(firestore, "brobuilds", selectedPost?.id!);
      batch.update(broBuildDocRef, {
        numberOfComments: increment(-1),
      });

      // Push db changes
      await batch.commit();

      // Update client side commnets/bro builds state
      setBroBuildsStateValue((prev) => ({
        ...prev,
        selectedBroBuild: {
          ...prev.selectedBroBuild,
          numberOfComments: prev.selectedBroBuild?.numberOfComments! - 1,
        } as BroBuild,
      }));

      // Update client side comments
      setComments((prev) => prev.filter((item) => item.id !== comment.id));
    } catch (error) {
      console.log("onDeleteComment error:", error);
    }
    setLoadingDeleteId("");
  };

  // Effects
  useEffect(() => {
    // Gets all posts from the DB when a user selects/views a new post.
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

  // JSX
  return (
    <Box mt={2} width={"40%"} bg="white" borderRadius={"0px 0px 4px 4px"} p={2}>
      <Flex
        direction="column"
        pl={10}
        pr={4}
        mb={6}
        fontSize="10pt"
        width={"100%"}
      >
        <CommentInput
          commentText={commentText}
          setComment={setCommentText}
          user={user}
          createLoading={createLoading}
          onCreateComment={onCreateComment}
        ></CommentInput>
      </Flex>
      <Stack spacing={6} p={2}>
        {fetchLoading ? (
          <>
            {[0, 1, 2].map((item) => (
              <Box key={item} padding="6" bg="white">
                <SkeletonCircle size="10" />
                <SkeletonText mt="4" noOfLines={2} spacing="4" />
              </Box>
            ))}
          </>
        ) : (
          <>
            {!!comments.length ? (
              <>
                {comments.map((item: Comment) => (
                  <CommentItem
                    key={item.id}
                    comment={item}
                    onDeleteComment={onDeleteComment}
                    loadingDelete={loadingDeleteId === item.id}
                    userId={user?.uid}
                  />
                ))}
              </>
            ) : (
              <Flex
                direction="column"
                justify="center"
                align="center"
                borderTop="1px solid"
                borderColor="gray.100"
                p={20}
              >
                <Text fontWeight={700} opacity={0.3}>
                  No Comments Yet
                </Text>
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Box>
  );
};
export default BuildComments;
