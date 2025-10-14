import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    addDialogOpen: false,
    editDialogOpen: false,
  },
  reducers: {
    openAddDialog: (state) => { state.addDialogOpen = true; },
    closeAddDialog: (state) => { state.addDialogOpen = false; },
    openEditDialog: (state) => { state.editDialogOpen = true; },
    closeEditDialog: (state) => { state.editDialogOpen = false; },
  },
});

export const { openAddDialog, closeAddDialog, openEditDialog, closeEditDialog } = uiSlice.actions;
export default uiSlice.reducer;
