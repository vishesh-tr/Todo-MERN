import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, UserState } from "./Types";



const initialState: UserState = {
  users:[],
  loading: false,
  error: null,
  total: 0,
  page: 0,
  limit: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchRequest: (state) => {
      state.loading = true;
    },

    fetchRequestFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error= action.payload
    },

    clearState: (state) => {
      state = initialState;
    },



    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
      // localStorage.setItem("users", JSON.stringify(state.users));
    },
    updateUser: (state, action: PayloadAction<User>) => {
      const index = state.users.findIndex(user => user._id === action.payload._id);
      if (index !== -1) {
        state.users[index] = action.payload;
        localStorage.setItem("users", JSON.stringify(state.users));
      }
    },
    deleteUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(user => user._id !== action.payload);
      localStorage.setItem("users", JSON.stringify(state.users));
    },
  },
});

export const { addUser, updateUser, deleteUser, fetchRequest, fetchRequestFailure, clearState } = userSlice.actions;
export default userSlice.reducer;






// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { User, UserState } from "./Types";

// // Check if users exist in localStorage
// const storedUsers = localStorage.getItem("users");
// const parsedUsers: User[] = storedUsers ? JSON.parse(storedUsers) : [];

// // Default Admin User
// const defaultAdmin: User = {
//   _id: "admin-001",
//   name: "vishesh",
//   email: "vishesh@gmail.com",
//   password: "admin123", 
//   role: "admin",
// };

// // Ensure Admin exists
// const usersWithAdmin = parsedUsers.some(user => user.role === "admin")
//   ? parsedUsers
//   : [defaultAdmin, ...parsedUsers];

// // Store updated users back to localStorage
// localStorage.setItem("users", JSON.stringify(usersWithAdmin));

// const initialState: UserState = {
//   users: usersWithAdmin,
//   loading: false,
//   error: null,
//   total: usersWithAdmin.length,
//   page: 1,
//   limit: 10,
// };

// const userSlice = createSlice({
//   name: "user",
//   initialState,
//   reducers: {
//     fetchRequest: (state) => {
//       state.loading = true;
//     },

//     fetchRequestFailure: (state, action: PayloadAction<string>) => {
//       state.loading = false;
//       state.error = action.payload;
//     },

//     clearState: (state) => {
//       state.users = usersWithAdmin; // Reset to initial state including admin
//     },

//     addUser: (state, action: PayloadAction<User>) => {
//       state.users.push(action.payload);
//       localStorage.setItem("users", JSON.stringify(state.users));
//     },
    
//     updateUser: (state, action: PayloadAction<User>) => {
//       const index = state.users.findIndex(user => user._id === action.payload._id);
//       if (index !== -1) {
//         state.users[index] = action.payload;
//         localStorage.setItem("users", JSON.stringify(state.users));
//       }
//     },
    
//     deleteUser: (state, action: PayloadAction<string>) => {
//       state.users = state.users.filter(user => user._id !== action.payload);
//       localStorage.setItem("users", JSON.stringify(state.users));
//     },
//   },
// });

// export const { addUser, updateUser, deleteUser, fetchRequest, fetchRequestFailure, clearState } =
//   userSlice.actions;
// export default userSlice.reducer;
