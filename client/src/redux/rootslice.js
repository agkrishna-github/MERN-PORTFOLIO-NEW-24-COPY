import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  portfolioData: null,
  reloadData: false,
};

const rootSlice = createSlice({
  name: "root",
  initialState,
  reducers: {
    showLoading: (state, action) => {
      state.loading = true;
    },
    hideLoading: (state, action) => {
      state.loading = false;
    },
    setPortfolioData: (state, action) => {
      state.portfolioData = action.payload;
    },
    ReloadData: (state, action) => {
      state.reloadData = action.payload;
    },
  },
});

export default rootSlice.reducer;
export const { showLoading, hideLoading, setPortfolioData, ReloadData } =
  rootSlice.actions;
