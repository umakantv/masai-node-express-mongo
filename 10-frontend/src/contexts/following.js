import React, { useContext, useEffect, useState } from "react";
import { follow, unfollow, getFollowing } from "../api/follow";
import AuthContext from "./auth";

const FollowingContext = React.createContext({
  following: [],
  refetchFollowing: () => {},
  followingUser: (userId) => false,
  followUser: async (userId) => {},
  unfollowUser: async (userId) => {},
});

export function FollowingContextProvider({ children }) {
  const { user, setShowLoginForm } = useContext(AuthContext);
  const [following, setFollowing] = useState([]);

  const refetchFollowing = async () => {
    return getFollowing(user._id).then((res) => {
      setFollowing(res.data.data);
    });
  };

  const followingUser = (userId) => {
    return following.find((item) => item.following._id === userId);
  };

  const followUser = async (userId) => {
    if (!user) return setShowLoginForm(true);
    return follow(userId).then(refetchFollowing);
  };

  const unfollowUser = async (userId) => {
    if (!user) return setShowLoginForm(true);
    return unfollow(userId).then(refetchFollowing);
  };

  useEffect(() => {
    if (user) {
      refetchFollowing();
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <FollowingContext.Provider
      value={{
        following,
        refetchFollowing,
        followingUser,
        followUser,
        unfollowUser,
      }}
    >
      {children}
    </FollowingContext.Provider>
  );
}

export default FollowingContext;
