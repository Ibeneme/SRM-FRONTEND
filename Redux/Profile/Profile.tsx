import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface ProfileState {
  profile: any; // Adjust the type based on your profile data structure
  loading: boolean;
  error: string | null;
}

// interface TestState {
//   first_name: string;
// }

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
};

const baseApiUrl = "https://srm.neofin.ng";

export const getOrganizationProfile = createAsyncThunk(
  "profile/getOrganizationProfile",
  async () => {
    const token = localStorage.getItem("srm_access_token");

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
  const token = localStorage.getItem("srm_access_token");

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

export const getDepartments = createAsyncThunk(
  "profile/getDepartments",
  async () => {
    const token = localStorage.getItem("srm_access_token");

    try {
      const response = await axios.get(
        `${baseApiUrl}/profile/get-departments/`,
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

export const createDepartment = createAsyncThunk(
  "auth/createDepartment",
  async (createDepartment: any, { rejectWithValue }) => {
    const token = localStorage.getItem("srm_access_token");

    try {
      // const formData = new FormData();
      // Object.keys(createDepartment).forEach((key) => {
      //   formData.append(key, createDepartment[key]);
      // });

      const response = await axios.post(
        `${baseApiUrl}/profile/create-department/`,
        createDepartment,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(createDepartment, "fm");
      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);


export const AddFrontDesk = createAsyncThunk(
  "auth/AddFrontDesk",
  async (AddFrontDesk: any, { rejectWithValue }) => {
    const token = localStorage.getItem("srm_access_token");

    try {
      // const formData = new FormData();
      // Object.keys(AddFrontDesk).forEach((key) => {
      //   formData.append(key, AddFrontDesk[key]);
      // });

      const response = await axios.post(
        `${baseApiUrl}/profile/add-frontdesk/`,
        AddFrontDesk,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(AddFrontDesk, "fm");
      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);

export const editDepartment = createAsyncThunk(
  "auth/editDepartment",
  async (
    { editDepartment, department }: { editDepartment: any; department: string },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("srm_access_token");
    console.log(editDepartment, department, "departmentdepartment");
    try {
      const response = await axios.put(
        `${baseApiUrl}/profile/update-department/${department}/`,
        editDepartment, // Pass editDepartment directly as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "fm");
      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);

export const updateStaff = createAsyncThunk(
  "auth/updateStaff",
  async (
    { updateStaff, user_id }: { updateStaff: any; user_id: string },
    { rejectWithValue }
  ) => {
    const token = localStorage.getItem("srm_access_token");
    console.log(updateStaff, user_id, "user_iduser_id");
    try {
      const response = await axios.put(
        `${baseApiUrl}/profile/update-staff/${user_id}/`,
        updateStaff, // Pass updateStaff directly as the request body
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "fm");
      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);

export const deleteStaff = createAsyncThunk(
  "auth/deleteStaff",
  async (user_id: any, { rejectWithValue }) => {

    const token = localStorage.getItem("srm_access_token");
    console.log(user_id, user_id, "departmentdepartment");
    try {
      const response = await axios.delete(
        `${baseApiUrl}/profile/delete-staff/${user_id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "fm");
      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);


export const deleteDepartment = createAsyncThunk(
  "auth/deleteDepartment",
  async (deleteDepartment: any, { rejectWithValue }) => {

    const token = localStorage.getItem("srm_access_token");
    console.log(deleteDepartment, deleteDepartment, "departmentdepartment");
    try {
      const response = await axios.delete(
        `${baseApiUrl}/profile/delete-department/${deleteDepartment}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response, "fm");
      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);

export const updateOrganizationProfile = createAsyncThunk(
  "auth/updateOrganizationProfile",
  async (updatedProfile: any, { rejectWithValue }) => {
    console.log(updatedProfile, " hhhhh");
    const token = localStorage.getItem("srm_access_token");
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

export const updatePersonalProfile = createAsyncThunk(
  "auth/updatePersonalProfile",
  async (updatePersonalProfile: any, { rejectWithValue }) => {
    const token = localStorage.getItem("srm_access_token");

    try {
      const formData = new FormData();
      Object.keys(updatePersonalProfile).forEach((key) => {
        formData.append(key, updatePersonalProfile[key]);
      });

      const response = await axios.put(
        `${baseApiUrl}/profile/update-data/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);
export const importStaff = createAsyncThunk(
  "auth/importStaff",
  async (formData: FormData, { rejectWithValue }) => {
    const token = localStorage.getItem("srm_access_token");

    try {
      const response = await axios.post(
        `${baseApiUrl}/auth/import-staff/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log(response);
      return response.status;
    } catch (error) {
      console.error(error, "Organization Profile Update Error");
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.status);
      }
      return rejectWithValue("Network Error");
    }
  }
);

export const getUserCSV = createAsyncThunk("profile/getUserCSV", async () => {
  const token = localStorage.getItem("srm_access_token");

  try {
    const response = await axios.get(`${baseApiUrl}/profile/export-users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    return error;
  }
});

export const getAllUsers = createAsyncThunk("profile/getAllUsers", async () => {
  const token = localStorage.getItem("srm_access_token");

  try {
    const response = await axios.get(`${baseApiUrl}/profile/all-users/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
    return error;
  }
});

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
    builder
      .addCase(updatePersonalProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePersonalProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updatePersonalProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
    builder
      .addCase(getDepartments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDepartments.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getDepartments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
    builder
      .addCase(createDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(createDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
    builder
      .addCase(getUserCSV.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserCSV.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getUserCSV.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
    builder
      .addCase(importStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(importStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(importStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
    builder
      .addCase(getAllUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(getAllUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
    builder
      .addCase(editDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(editDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
      builder
      .addCase(deleteDepartment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDepartment.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(deleteDepartment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
      builder
      .addCase(updateStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(updateStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
      builder
      .addCase(deleteStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(deleteStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
      builder
      .addCase(AddFrontDesk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddFrontDesk.fulfilled, (state, action) => {
        state.loading = false;
        state.profile = action.payload;
      })
      .addCase(AddFrontDesk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to update profile";
      });
  },
});

export default profileSlice.reducer;
