import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import firebaseConfig from "./firebaseConfig";

const app = initializeApp(firebaseConfig);
const auth =
    Platform.OS !== "web"
        ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
        : initializeAuth(app, {});

const db = getFirestore(app);

export { app, auth, db };
