import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogging: false,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });

    } catch (error) {
      console.log("Error in authCheck:", error);
      set({ authUser: null });

    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const response = await axiosInstance.post("/auth/signup", data);
      set({ authUser: response.data });

      toast.success("Account created successfully");

    } catch (error) {
      toast.error(error.response.data.message);

    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isLogging: true });

    try {
      const response = await axiosInstance.post("/auth/login", data);
      set({ authUser: response.data });

      toast.success("Login successfully");

    } catch (error) {
      toast.error(error.response.data.message);

    } finally {
      set({ isLogging: false });
    }
  },

  logOut: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });

      toast.success("Logout successfully");

    } catch (error) {
      toast.error("Error logging out");
      console.log("logout Error:", error);
    }
  },

  updateProfile: async (data) => {
    try {
      const response = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: response.data });

      toast.success("Profile updated Successfully");
    } catch (error) {
      console.log("Error updatig profile:", error);
      toast.error(error.response.data.message);
    }
  }
}))