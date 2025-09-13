import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavBar() {
    const router = useRouter();
    const pathname = usePathname();

    const goTo = (path: string) => {
        if (pathname !== path) {
            router.replace(path);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/home")}>
                <FontAwesome5 name="home" size={24} color="white" />
                <Text style={iconStyle.text}>Accueil</Text>
            </TouchableOpacity>
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/search")}>
                <FontAwesome5 name="search" size={24} color="white" />
                <Text style={iconStyle.text}>Rechercher</Text>
            </TouchableOpacity>
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/pro")}>
                <FontAwesome5 name="plus-circle" size={24} color="white" />
                <Text style={iconStyle.text}>Pro</Text>
            </TouchableOpacity>
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
