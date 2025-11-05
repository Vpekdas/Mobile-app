import { DEFAULT_TEXT_STYLE } from "../../constants";
import { useUser } from "../../contexts/UserContext";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { usePathname, useRouter } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Platform, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function NavBar() {
    const { t } = useTranslation();

    const { userData, loading, error } = useUser();
    const router = useRouter();
    const pathname = usePathname();

    if (loading) {
        return (
            <View style={styles.container}>
                <Text style={DEFAULT_TEXT_STYLE}>{t("loading")}</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text style={DEFAULT_TEXT_STYLE}>{t("errorLoadingUserData")}</Text>
            </View>
        );
    }

    const goTo = (path: string) => {
        if (pathname !== path) {
            router.replace(path);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/home")}>
                <FontAwesome5 name="home" size={24} color="white" />
                <Text style={iconStyle.text}>{t("home")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/search")}>
                <FontAwesome5 name="search" size={24} color="white" />
                <Text style={iconStyle.text}>{t("search")}</Text>
            </TouchableOpacity>

            {userData?.type === "professional" && (
                <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/pro")}>
                    <FontAwesome5 name="plus-circle" size={24} color="white" />
                    <Text style={iconStyle.text}>{t("pro")}</Text>
                </TouchableOpacity>
            )}

            {userData?.type === "user" && (
                <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/offer")}>
                    <FontAwesome5 name="tags" size={24} color="white" />
                    <Text style={iconStyle.text}>{t("offer")}</Text>
                </TouchableOpacity>
            )}

            <TouchableOpacity style={iconStyle.container} onPress={() => goTo("/account")}>
                <FontAwesome5 name="user" size={24} color="white" />
                <Text style={iconStyle.text}>{t("account")}</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        bottom: Platform.OS === "android" ? 20 : 0,
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
