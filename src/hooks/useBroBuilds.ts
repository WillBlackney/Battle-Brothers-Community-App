import React from "react";
import { useRecoilState } from "recoil";
import { broBuildState } from "../atoms/broBuildsAtom";

const useBroBuilds = () => {
  const [broBuildsStatevalue, setBroBuildsStateValue] =
    useRecoilState(broBuildState);

  const onVoteBroBuild = async () => {};

  const onSelectBroBuild = () => {};

  const onDeleteBroBuild = async () => {};

  return {
    broBuildsStatevalue,
    setBroBuildsStateValue,
    onVoteBroBuild,
    onSelectBroBuild,
    onDeleteBroBuild,
  };
};

export default useBroBuilds;
