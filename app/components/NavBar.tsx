import { db } from "@/firebase";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { usePathname, useRouter } from "expo-router";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavBar() {
    const [userType, setUserType] = useState(null);
    const router = useRouter();
    const pathname = usePathname();
    const auth = getAuth();
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const userRef = doc(db, "users", user.uid);
            const fetchUserType = async () => {
                try {
                    const docSnap = await getDoc(userRef);
                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUserType(userData.type);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };

            fetchUserType();
        }
    }, [user]);

    const goTo = (path: string) => {
        if (pathname !== path) {
            router.replace(path);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/home")}>
                <FontAwesome5 name="home" size={24} color="white" />
                <Text style={iconStyle.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/search")}>
                <FontAwesome5 name="search" size={24} color="white" />
                <Text style={iconStyle.text}>Search</Text>
            </TouchableOpacity>
            {userType === "professional" && (
                <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/pro")}>
                    <FontAwesome5 name="plus-circle" size={24} color="white" />
                    <Text style={iconStyle.text}>Pro</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/account")}>
                <FontAwesome5 name="user" size={24} color="white" />
                <Text style={iconStyle.text}>Compte</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        paddingHorizontal: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#070670",
    },
});

const iconStyle = StyleSheet.create({
    container: {
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
    },
    text: {
        color: "white",
        marginTop: 4,
        fontSize: 12,
    },
});
