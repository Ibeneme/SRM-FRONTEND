import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../Redux/Store";
import {
  getOrganizationProfile,
  getProfile,
} from "../../../Redux/Profile/Profile";
import { ThunkDispatch } from "redux-thunk";

const YourComponent: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<RootState, undefined, any>>();
  const [organizationProfile, setOrganizationProfile] = useState<any | null>(
    null
  );
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const loading = useSelector((state: RootState) => state.profile.loading);
  const error = useSelector((state: RootState) => state.profile.error);

  useEffect(() => {
    // Dispatch getOrganizationProfile thunk when the component mounts
    dispatch(getOrganizationProfile()).then((result) => {
      setOrganizationProfile(result.payload);
    });

    // Dispatch getProfile thunk when the component mounts
    dispatch(getProfile()).then((result) => {
      setUserProfile(result.payload);
    });
  }, [dispatch]);
  console.log(organizationProfile, "organizationProfile");
  console.log(userProfile, "userProfile");
  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      {organizationProfile && (
        <div>
          <h2>Organization Profile</h2>
          {/* Display organization profile data */}
          {/* ... */}
        </div>
      )}
      {userProfile && (
        <div>
          <h2>User Profile</h2>
          {/* Display user profile data */}
          {/* ... */}
        </div>
      )}
    </div>
  );
};

export default YourComponent;
