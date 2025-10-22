import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const handleLogoutPress = async () => {
    const auth = getAuth();

    try {
        await signOut(auth);
        router.replace("/login");
    } catch (error) {
        console.error(error);
    }
};

export default function Account() {
    const { t } = useTranslation();

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/account/info")}>
                <Text style={styles.text}>{t("accountInformation")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/contact")}>
                <Text style={styles.text}>{t("Contact")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/legal")}>
                <Text style={styles.text}>{t("Legal")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("hello")}>
                <Text style={styles.text}>{t("Notification")}</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogoutPress}>
                <Text style={styles.logout}>{t("Logout")}</Text>
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
});
