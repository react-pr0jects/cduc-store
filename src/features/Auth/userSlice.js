import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import userApi from "../../api/userApi";
import StorageKeys from "../../constants/storage-keys";

// First, create the thunk
export const register = createAsyncThunk(
  'user/register',
  async (payload) => {
    // Call API to register
    const data = await userApi.register(payload)

    //Save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt)
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))

    //Return user data (là kết quả trả về sẽ đc cập nhật vào trong Redux State 
    // của acction.payload ở dưới ExtraReducer)
    return data.user
  }
)

export const login = createAsyncThunk(
  'user/login',
  async (payload) => {
    // Call API to login
    const data = await userApi.login(payload)

    //Save data to local storage
    localStorage.setItem(StorageKeys.TOKEN, data.jwt)
    localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user))

    //Return user data (là kết quả trả về sẽ đc cập nhật vào trong Redux State 
    // của acction.payload ở dưới ExtraReducer)
    return data.user
  }
)


const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
        settings: {},
    },
    reducers: {
      logout(state) {
        localStorage.removeItem(StorageKeys.USER)
        localStorage.removeItem(StorageKeys.TOKEN)

        state.current = {}
      }
    },
    extraReducers: {
      [register.fullfilled]: (state, action) => { // có nghĩa là 'user/register/fullfilled': () => {}
        state.current = action.payload
      },

      [login.fullfilled]: (state, action) => { // có nghĩa là 'user/login/fullfilled': () => {}
        state.current = action.payload
      } 
    }
});

const { actions, reducer } = userSlice;
export const { logout } = actions
export default reducer;