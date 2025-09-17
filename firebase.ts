import AsyncStorage from "@react-native-async-storage/async-storage";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import firebaseConfig from "./firebaseConfig";
const isWeb = Platform.OS === "web";

let app, auth, db;

if (isWeb) {
    app = initializeApp(firebaseConfig);

    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
    });

    db = getFirestore(app);
}

export { app, auth, db };
