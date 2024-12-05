import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';

const themes = {
  winter: 'winter',
  dracula: 'dracula'
}

const getUserFromStorage = () => {
  return JSON.parse(localStorage.getItem('user')) || null;
}

const getStorageTheme = () => {  
  const theme = localStorage.getItem('theme') || themes.winter;
  document.documentElement.setAttribute('data-theme', theme);  
  return theme;
}

const initialState = {
  user: getUserFromStorage(),
  theme: getStorageTheme(),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser: (state, action) => {     
     const user = {...action.payload.user, token: action.payload.jwt};
     state.user = user;
     localStorage.setItem('user', JSON.stringify(user));      
    },

    logOut: (state) => {
      state.user = null;      
      localStorage.removeItem('user');
      toast.warning('Sikeresen kilépett');
    },

    toggleTheme: (state) => {
      const { dracula, winter } = themes;
      state.theme = state.theme === dracula? winter : dracula;      
      document.documentElement.setAttribute('data-theme', state.theme);
      localStorage.setItem('theme', state.theme);
    }
  }
});
export const { loginUser, logOut, toggleTheme } = userSlice.actions;

export default userSlice.reducer;