import { auth, db } from "@/firebase";
import { User as FirebaseUser, onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Image, ImageSourcePropType, StyleSheet, Text, View } from "react-native";

interface UserHeaderProps {
    profilePicUri: ImageSourcePropType;
}

export default function UserHeader({ profilePicUri }: UserHeaderProps) {
    const [firstName, setFirstName] = useState<string>("");

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user: FirebaseUser | null) => {
            if (user) {
                try {
                    const userDocRef = doc(db, "users", user.uid);
                    const userDocSnap = await getDoc(userDocRef);

                    if (userDocSnap.exists()) {
                        const userData = userDocSnap.data();
                        setFirstName(userData.firstName || "");
                    } else {
                        const displayName = user.displayName || "";
                        const first = displayName.split(" ")[0];
                        setFirstName(first);
                    }
                } catch (error) {
                    console.error("Failed to fetch user document:", error);
                    setFirstName("");
                }
            } else {
                setFirstName("");
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Bonjour {firstName || ""}!</Text>
            <Image source={profilePicUri} style={styles.image} />
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
