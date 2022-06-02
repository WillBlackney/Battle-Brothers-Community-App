import {
  Box,
  Flex,
  SkeletonCircle,
  SkeletonText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { async } from "@firebase/util";
import { User } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { BroBuild, broBuildState } from "../../atoms/broBuildsAtom";
import CommentInput from "./CommentInput";
import { authModalState } from "../../atoms/AuthModalAtom";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  orderBy,
  query,
  serverTimestamp,
  Timestamp,
  where,
  writeBatch,
} from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import { useSetRecoilState } from "recoil";
import CommentItem, { Comment } from "./CommentItem";

type BuildCommentsProps = {
  user: User;
  selectedPost: BroBuild | null;
};

const BuildComments: React.FC<BuildCommentsProps> = ({
  user,
  selectedPost,
}) => {
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);
  const [fetchLoading, setFetchLoading] = useState(true);
  const [createLoading, setCreateLoading] = useState(false);
  const [loadingDeleteId, setLoadingDeleteId] = useState("");
  const setBroBuildsStateValue = useSetRecoilState(broBuildState);

  const onCreateComment = async (comment: string) => {
    try {
      setCreateLoading(true);
      const batch = writeBatch(firestore);

      const commentDocRef = doc(collection(firestore, "comments"));

      const newComment: Comment = {
        id: commentDocRef.id,
        creatorId: user.uid,
        creatorDisplayText: user.email!.split("@")[0],
        broBuildId: selectedPost?.id!,
        broBuildTitle: selectedPost?.buildName!,
        text: commentText,
        createdAt: serverTimestamp() as Timestamp,
      };
      batch.set(commentDocRef, newComment);
      newComment.createdAt = { seconds: Date.now() / 1000 } as Timestamp;

      const broBuildDocRef = doc(firestore, "brobuilds", selectedPost?.id!);
      batch.update(broBuildDocRef, {
        numberOfComments: increment(1),
      });

      await batch.commit();

      // update client side state after DB changes
      setCommentText("");
      setComments((prev) => [newComment, ...prev]);
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
    setCreateLoading(false);
  };
  const onDeleteComment = async (comment: any) => {
    setLoadingDeleteId(comment.id);
    try {
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

  const getPostComments = async () => {
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

      setComments(comments as Comment[]);
    } catch (error) {
      console.log("getPostComments error:", error);
    }

    setFetchLoading(false);
  };

  useEffect(() => {
    if (!selectedPost) return;
    getPostComments();
  }, [selectedPost]);

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
