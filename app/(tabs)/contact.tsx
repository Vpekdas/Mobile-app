import { BASIC_LOGO } from "@/constants";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Logo from "../components/Logo";

export default function Contact() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>📞 Phone: +123 456 789</Text>
                        <Text style={styles.label}>💬 WhatsApp: https://wa.me/123456789</Text>
                        <Text style={styles.label}>✉️ Email: contact@example.com</Text>
                        <Text style={styles.label}>🏢 Name: Company Name</Text>
                    </View>

                    <View style={styles.socialContainer}>
                        <Text style={styles.socialTitle}>Follow us</Text>
                        <View style={styles.socialIcons}>
                            <FontAwesome5 name="whatsapp" size={28} color="#25D366" />
                            <FontAwesome5 name="facebook-square" size={28} color="#1877F2" />
                            <FontAwesome5 name="instagram" size={28} color="#C13584" />
                        </View>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>📍 Address: 123 Main Street, City, Country</Text>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        padding: 20,
        alignItems: "center",
        gap: 25,
        paddingBottom: 100,
        backgroundColor: "white",
    },
    labeledField: {
        width: "100%",
        gap: 8,
        backgroundColor: "#F9F9F9",
        padding: 16,
        borderRadius: 8,
    },
    label: {
        fontWeight: "600",
        fontSize: 16,
        color: "#333",
    },
    socialContainer: {
        alignItems: "center",
        gap: 10,
    },
    socialTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    socialIcons: {
        flexDirection: "row",
        gap: 20,
    },
});
