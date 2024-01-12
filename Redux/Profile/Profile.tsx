import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

interface ProfileState {
  profile: any; // Adjust the type based on your profile data structure
  loading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const baseApiUrl = "https://srm.neofin.ng";

export const getOrganizationProfile = createAsyncThunk(
  "profile/getOrganizationProfile",
  async () => {
    const token = localStorage.getItem("access_token");

    try {
      const response = await axios.get(
        `${baseApiUrl}/profile/get-organization/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return error;
    }
  }
);
export const getProfile = createAsyncThunk("profile/getProfile", async () => {
  const token = localStorage.getItem("access_token");

  try {
    const response = await axios.get(`${baseApiUrl}/profile/get-profile/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
});

export const updateOrganizationProfile = createAsyncThunk(
  "auth/updateOrganizationProfile",
  async (updatedProfile: any, { rejectWithValue }) => {
    console.log(updatedProfile, " hhhhh");
    const token = localStorage.getItem("access_token");
    try {
      const response = await axios.put(
        `${baseApiUrl}/profile/update-organization/`,
        updatedProfile,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "Organization Profile Update Response");
      return response.status;
    } catch (error) {
      console.log(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizationProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrganizationProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getOrganizationProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to fetch profile";
      });
    builder
      .addCase(getProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to fetch profile";
      });

    builder
      .addCase(updateOrganizationProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateOrganizationProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateOrganizationProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
  },
});

export default profileSlice.reducer;
