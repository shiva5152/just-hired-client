import { PayloadAction,createSlice } from "@reduxjs/toolkit";

export interface EmailTemplate{
    id: string;
    templateType: string;
    templateName: string;
    subject: string;
    body: string;
}

export interface EmailTemplateState {
    templates: EmailTemplate[];
    loading: boolean;
    error: string;
  }
  
  const initialState: EmailTemplateState = {
    templates: [],
    loading: false,
    error: "",
  };

  export const emailTemplateSlice = createSlice({
    name: "EmailTemplate",
    initialState,
    reducers: {
      fetchEmailTemplateRequest: (state) => {
        state.loading = true;
      },
      setEmailTemplates: (state, action: PayloadAction<EmailTemplate[]>) => {
        state.templates = action.payload;
      },
      fetchEmailTemplateSuccess: (state, action: PayloadAction<EmailTemplate[]>) => {
        state.loading = false;
        state.templates = action.payload;
      },
      addEmailTemplateSuccess: (state, action: PayloadAction<EmailTemplate>) =>{
        state.loading = false;
        state.templates.push(action.payload);
      },
      updateEmailTemplateSuccess: (state, action: PayloadAction<EmailTemplate>) => {
        state.loading = false;
        state.templates = state.templates.map((template) =>
          template.id === action.payload.id ? action.payload : template
        );
      },
      deleteEmailTemplateSuccess: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.templates = state.templates.filter((template) => template.id !== action.payload);
      },
      fetchEmailTemplateError: (state, action: PayloadAction<string>) => {
        state.loading = false;
        state.error = action.payload;
      },
    },
  });

  export const {
    fetchEmailTemplateRequest,
    fetchEmailTemplateSuccess,
    addEmailTemplateSuccess,
    updateEmailTemplateSuccess,
    deleteEmailTemplateSuccess,
    fetchEmailTemplateError,
    setEmailTemplates,
  } = emailTemplateSlice.actions;

  export default emailTemplateSlice.reducer;