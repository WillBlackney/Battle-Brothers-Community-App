import { useEffect, useState } from "react";
import { Stack } from "@chakra-ui/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import type { NextPage } from "next";
import PageContentLayout from "../components/Layout/PageContent";
import PostLoader from "./BroPost/Loader";
import { firestore } from "../firebase/clientApp";
import BroPostFeedContainer from "../components/BroFeedPage/BroPostFeedContainer";

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
    </PageContentLayout>
  );
};

export default Home;
