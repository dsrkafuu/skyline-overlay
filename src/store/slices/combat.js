import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  // combat active status
  isActive: false,
  // root encounter object
  encounter: {},
  // all combatants data array
  combatant: [],
};

const slice = createSlice({
  name: 'combat',
  initialState,

  reducers: {
    /**
     * update new combat data
     * @param {{ payload: { isActive, encounter, combatant } }} action
     */
    updateCombat(state, action) {
      const { isActive, encounter, combatant } = action.payload;
      state.active = isActive;
      state.encounter = encounter;
      state.combatant = combatant;
    },

    clearCombat(state) {
      const { isActive, encounter, combatant } = initialState;
      state.active = isActive;
      state.encounter = encounter;
      state.combatant = combatant;
    },
  },
});

export const { updateCombat, clearCombat } = slice.actions;

export default slice.reducer;
