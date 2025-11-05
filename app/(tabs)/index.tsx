import { auth } from "../../firebase";
import { router } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";

export default function Index() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setLoading(false);

            if (user) {
                if (user.emailVerified) {
                    router.replace("/home");
                } else {
                    router.replace("/login");
                }
            } else {
                router.replace("/login");
            }
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return null;
    }

    return null;
}
