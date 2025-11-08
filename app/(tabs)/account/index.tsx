import TextWithBorder from "@/app/components/TextWithBorder";
import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native";

const handleLogoutPress = async () => {
    const auth = getAuth();

    try {
        await signOut(auth);
        router.replace("/login");
    } catch (error: unknown) {
        let errorMessage = "An unexpected error occurred during logout.";
        if (error instanceof Error) {
            errorMessage = error.message;
        } else if (typeof error === "string") {
            errorMessage = error;
        }
        Alert.alert("Error", errorMessage);
    }
};

export default function Account() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/account/info")}>
                <TextWithBorder
                    children={t("accountInformation")}
                    containerStyle={styles.textContainer}
                ></TextWithBorder>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/contact")}>
                <TextWithBorder children={t("contact")} containerStyle={styles.textContainer}></TextWithBorder>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/legal")}>
                <TextWithBorder children={t("legal")} containerStyle={styles.textContainer}></TextWithBorder>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => Alert.alert("Notification","notification")}>
                <TextWithBorder children={t("notification")} containerStyle={styles.textContainer}></TextWithBorder>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(tabs)/account/offer")}>
                <TextWithBorder children={t("offer")} containerStyle={styles.textContainer}></TextWithBorder>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogoutPress}>
                <TextWithBorder children={t("logout")} containerStyle={styles.textContainer}></TextWithBorder>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffffff",
        padding: 16,
        justifyContent: "space-evenly",
        flexDirection: "column",
    },
    text: {
        fontSize: 20,
        color: "#5D737E",
        fontWeight: "600",
        marginBottom: 12,
        padding: 16,
    },
    logout: {
        fontSize: 20,
        fontWeight: "600",
        marginBottom: 12,
        padding: 16,
        color: "#070670",
    },
    textContainer: {
        width: "100%",
    },
});
