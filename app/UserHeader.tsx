import { auth, db } from "@/firebase";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function UserHeader() {
    const [firstName, setFirstName] = useState<string>("");
    const [profilePicUri, setProfilePicUri] = useState<string | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        setFirstName(userData.firstName || "");
                        setProfilePicUri(userData.profileImageUrl || null);
                    } else {
                        const displayName = user.displayName || "";
                        const first = displayName.split(" ")[0];
                        setFirstName(first);
                    }
                } catch (error) {
                    console.error("Failed to fetch user document:", error);
                    setFirstName("");
                    setProfilePicUri(null);
                }
            } else {
                setFirstName("");
                setProfilePicUri(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bonjour {firstName || ""}!</Text>
            {profilePicUri ? (
                <Image source={{ uri: profilePicUri }} style={styles.image} />
            ) : (
                <View style={[styles.image, { backgroundColor: "#ccc" }]} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        padding: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    image: {
        width: 64,
        height: 64,
        borderRadius: 20,
        alignSelf: "flex-end",
    },
    text: {
        fontSize: 20,
        color: "#5D737E",
        fontWeight: "600",
        alignSelf: "center",
    },
});
