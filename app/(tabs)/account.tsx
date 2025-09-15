import { router } from "expo-router";
import { getAuth, signOut } from "firebase/auth";
import { Alert, StyleSheet, Text, TextStyle, TouchableOpacity, View } from "react-native";

export default function Account() {
    const handleLogoutPress = async () => {
        const auth = getAuth();

        try {
            await signOut(auth);
            Alert.alert("Logged out", "You have been logged out successfully.");
            router.replace("/login");
        } catch (error) {
            Alert.alert("Error", "Something went wrong while logging out.");
            console.error(error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => console.log("Compte clicked")}>
                <Text style={textStyle}>Compte</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Preference clicked")}>
                <Text style={textStyle}>Preference</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Appareil / Securite clicked")}>
                <Text style={textStyle}>Appareil / Securite</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Abonnement / Facturation clicked")}>
                <Text style={textStyle}>Abonnement / Facturation</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Support & Avis clicked")}>
                <Text style={textStyle}>Support & Avis</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => console.log("Legal clicked")}>
                <Text style={textStyle}>Legal</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleLogoutPress}>
                <Text style={textStyle}>Se deconnecter</Text>
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
    padding: 16
};
