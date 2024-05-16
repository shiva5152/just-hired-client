import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModelState {
  profileCompleteModel: boolean;
  subscriptionModel: boolean;
  subscriptionModelEmployer: boolean;
  planExhaustedModel:boolean;
  planExhaustedString:string;
  profileCompleteSuccessModel:boolean;
}

const initialState: ModelState = {
  profileCompleteModel: false,
  subscriptionModel: false,
  subscriptionModelEmployer: false,
  planExhaustedModel:false,
  planExhaustedString:"",
  profileCompleteSuccessModel:false,
};

const modelSlice = createSlice({
  name: "model",
  initialState,
  reducers: {
    setProfileCompleteModel: (state, action: PayloadAction<boolean>) => {
      state.profileCompleteModel = action.payload;
    },
    setSubscriptionModel: (state, action: PayloadAction<boolean>) => {
      state.subscriptionModel = action.payload;
    },
    setSubscriptionModelEmployer: (state, action: PayloadAction<boolean>) => {
      state.subscriptionModelEmployer = action.payload;
    },
    setPlanExhaustedModel: (state,action:PayloadAction<any>) => {
      state.planExhaustedModel = action.payload.value as boolean;
      state.planExhaustedString = action.payload.plan as string;
    },
    setProfileCompleteModelSuccess: (state,action:PayloadAction<boolean>) => {
      state.profileCompleteSuccessModel = action.payload;
    }
  },
});

export const {
  setProfileCompleteModel,
  setSubscriptionModel,
  setSubscriptionModelEmployer,
  setPlanExhaustedModel,
  setProfileCompleteModelSuccess,
} = modelSlice.actions;
export default modelSlice.reducer;
