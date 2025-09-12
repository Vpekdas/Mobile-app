import { auth } from "@/firebase";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect } from "react";

export default function Index() {
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.replace("/home");
            } else {
                router.replace("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    return null;
}

