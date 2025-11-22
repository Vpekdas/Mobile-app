import Constants from "expo-constants";
import { Platform } from "react-native";

const { googleMapsApiKey } = Constants.expoConfig.extra;

const firebaseConfig = Platform.select({
    ios: {
        apiKey: "AIzaSyChCJx61VIOJ8Z1iw01bIscYWjsqUtNqWk",
        projectId: "nie-1-cafaf",
        storageBucket: "nie-1-cafaf.firebasestorage.app",
        messagingSenderId: "355643408378",
        appId: "1:355643408378:ios:6af115e58273da6630ae43",
    },
    android: {
        apiKey: "",
        projectId: "nie-1-cafaf",
        storageBucket: "nie-1-cafaf.firebasestorage.app",
        messagingSenderId: "355643408378",
        appId: "1:355643408378:android:6e205b7e266abd2e30ae43"
    },
    default: {
        apiKey: "AIzaSyD9OjsPRbv4fV1HRemXQvdug26tQbJU1AI",
        authDomain: "nie-1-cafaf.firebaseapp.com",
        projectId: "nie-1-cafaf",
        storageBucket: "nie-1-cafaf.firebasestorage.app",
        messagingSenderId: "355643408378",
        appId: "1:355643408378:web:f371aab718804ea530ae43",
        measurementId: "G-0T3E1KMH95"
    },
});

export const googleMapsApi = googleMapsApiKey;
export default firebaseConfig;
