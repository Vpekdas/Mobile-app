import Constants from "expo-constants";
import { Platform } from "react-native";

const { googleMapsApiKey } = Constants.expoConfig.extra;

const firebaseConfig = Platform.select({
    ios: {
        apiKey: "AIzaSyCG5bnWGxkjjit4ucHanUfBXAf-5kMNDX0",
        projectId: "test-ac80a",
        storageBucket: "test-ac80a.firebasestorage.app",
        messagingSenderId: "132103483370",
        appId: "1:132103483370:ios:2ee135f44a5375e3fb0c93",
    },
    android: {
        apiKey: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: ""
    },
    default: {
        apiKey: "",
        authDomain: "",
        projectId: "",
        storageBucket: "",
        messagingSenderId: "",
        appId: "",
        measurementId: ""
    },
});

export const googleMapsApi = googleMapsApiKey;
export default firebaseConfig;
