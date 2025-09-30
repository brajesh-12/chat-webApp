import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : window.location.origin;

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogging: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth/check");
      set({ authUser: response.data });

      get().connectSocket();

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

      get().connectSocket();

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

      get().connectSocket();

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

      get().disconnectSocket();

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
  },

  connectSocket: () => {
    const { authUser } = get();
    const existingSocket = get().socket;
    if (!authUser) return;
    if (existingSocket && existingSocket.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true // this ensures cookies are sent with the connection
    });

    socket.connect();
    set({ socket });

    // listen for online users
    socket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
  const socket = get().socket;
  if (socket && socket.connected) socket.disconnect();
  }
}))