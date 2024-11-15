import { createSlice } from "@reduxjs/toolkit";

const initialState = {
location:{  
    city: null,
    county:[],
    neigbourhood:[]
}
};

export const filterProjectSlice = createSlice({
  name: "filterLocation",
  initialState,
  reducers: {
    setLocation: (state, action) => {
      // Eğer `county` alanı varsa ve bir dizi değilse, boş bir diziye dönüştür
      if (!Array.isArray(state.location.county) || !Array.isArray(state.location.neigbourhood)) {
        state.location.county = [];
        state.location.neigbourhood = [];
      }

      // Gelen action.payload'da `county` varsa özel bir işlem yapılacak
      if (action.payload.county) {
        action.payload.county.forEach((countyItem) => {
          if (!state.location.county.includes(countyItem)) {
            state?.location?.county.push(countyItem);
          } else {
            state.location.county = state.location.county.filter(item => item !== countyItem);
          }
        });
      }
      if (action?.payload?.neigbourhood) {
        action.payload.neigbourhood.forEach((countyItem) => {
          if (!state?.location?.neigbourhood.includes(countyItem)) {
            state?.location?.neigbourhood.push(countyItem);
          } else {
            state.location.neigbourhood = state.location.neigbourhood.filter(item => item !== countyItem);
          }
        });
      }
      // Diğer alanlar (city ve neighbourhood) doğrudan güncellenir
      state.location = {
        ...state.location,
        ...action.payload,
      };
    },
    clearLocation: (state) => {
        state.location = { city: null, county: [], neighborhood: [] };
      },
  
  },
});

export const { setLocation,clearLocation } = filterProjectSlice.actions;

export default filterProjectSlice.reducer;
