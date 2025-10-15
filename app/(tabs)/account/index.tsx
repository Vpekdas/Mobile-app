import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native";

export default function Account() {
    const handleLogoutPress = async () => {
        const auth = getAuth();

        try {
            await signOut(auth);
            router.replace("/login");
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push("/(tabs)/account/info")}>
                <Text style={textStyle}>Account Information</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Preference clicked")}>
                <Text style={textStyle}>Preference</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Device / Security clicked")}>
                <Text style={textStyle}>Device / Security</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Billing clicked")}>
                <Text style={textStyle}>Billing</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Support clicked")}>
                <Text style={textStyle}>Support</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Legal clicked")}>
                <Text style={textStyle}>Legal</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogoutPress}>
                <Text style={logoutTextStyle}>Logout</Text>
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
});

const textStyle: TextStyle = {
    fontSize: 20,
    color: "#5D737E",
    fontWeight: "600",
    marginBottom: 12,
    padding: 16,
};

const logoutTextStyle: TextStyle = {
    ...textStyle,
    color: "#070670",
};
