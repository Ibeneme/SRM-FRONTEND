import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface TicketsState {
  tickets: any; // Adjust the type based on your profile data structure
  loading: boolean;
  error: string | null;
}

// interface TestState {
//   first_name: string;
// }

const initialState: TicketsState = {
  tickets: null,
  loading: false,
  error: null,
};

const baseApiUrl = "https://srm.neofin.ng";

export const createTicket = createAsyncThunk(
  "auth/createTicket",
  async (createTicket: any, { rejectWithValue }) => {
    const token = localStorage.getItem("srm_access_token");

    try {
      const response = await axios.post(
        `${baseApiUrl}/ticket/create-ticket/`,
        createTicket,
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

export const getAllTickets = createAsyncThunk(
  "profile/getAllTickets",
  async () => {
    const token = localStorage.getItem("srm_access_token");

    try {
      const response = await axios.get(`${baseApiUrl}/ticket/all-tickets/`, {
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
  }
);

const TicketSlice = createSlice({
  name: "ticket",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(createTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to fetch tickets";
      });
    builder
      .addCase(getAllTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(getAllTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload
          ? (action.payload as string)
          : "Failed to fetch profile";
      });
  },
});

export default TicketSlice.reducer;
