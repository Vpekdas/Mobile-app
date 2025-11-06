import AsyncStorage from "@react-native-async-storage/async-storage";
import crashlytics from "@react-native-firebase/crashlytics";
import { initializeApp } from "firebase/app";
import { getReactNativePersistence, initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Platform } from "react-native";
import firebaseConfig from "./firebaseConfig";

let app = null;
let auth = null;
let db = null;

try {
    if (firebaseConfig?.apiKey) {
        app = initializeApp(firebaseConfig);

        auth =
            Platform.OS !== "web"
                ? initializeAuth(app, { persistence: getReactNativePersistence(AsyncStorage) })
                : initializeAuth(app, {});

        db = getFirestore(app);

        crashlytics().log("Firebase initialized successfully");
    } else {
        const warningMsg = "Firebase config missing — skipping Firebase initialization";
        console.warn(warningMsg);
        crashlytics().log(warningMsg);
    }
} catch (err: any) {
    console.error("Firebase initialization failed:", err);
    crashlytics().recordError(err);
}

export { app, auth, db };
