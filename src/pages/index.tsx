import { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import {
  collection,
  DocumentData,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRecoilValue } from "recoil";
import BroSearchFilterPanel from "../components/Community/BroSearchFilterPanel";
import PageContentLayout from "../components/Layout/PageContent";
import PostLoader from "../components/Post/Loader";
import { auth, firestore } from "../firebase/clientApp";
import Premium from "../components/Community/Premium";
import PersonalHome from "../components/Community/PersonalHome";
import BroPostFeedContainer from "../components/Community/BroPostFeedContainer";

const Home: NextPage = () => {
  // NEW
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    buildHomeFeed();
  }, []);

  const buildHomeFeed = async () => {
    console.log("Getting bro posts for feed");
    setLoading(true);

    try {
      const postQuery = query(
        collection(firestore, "brobuilds"),
        orderBy("createdAt", "desc"),
        limit(10)
      );

      const postDocs = await getDocs(postQuery);
      const posts = postDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.log("getBroPosts error: ", error);
    }

    setLoading(false);
  };

  return (
    <PageContentLayout>
      <>
        {loading ? (
          <PostLoader></PostLoader>
        ) : (
          <BroPostFeedContainer></BroPostFeedContainer>
        )}
      </>
      <Stack spacing={5} position="sticky" top="14px">
        <PersonalHome />
      </Stack>
    </PageContentLayout>
  );
};

export default Home;
