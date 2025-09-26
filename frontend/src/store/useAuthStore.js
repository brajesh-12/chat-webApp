import {create} from "zustand";

export const useAuthStore = create((set) => ({
  authUser: {
    id: "123",
    userName: "Brajesh",
    age: 25,
  },
  isLoading: false,
  isLoggedIn: false,

  login: () => {
    set({isLoggedIn: true});
  }
}))