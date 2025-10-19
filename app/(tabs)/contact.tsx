import { BASIC_LOGO } from "@/constants";
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Logo from "../components/Logo";
import TextWithBorder from "../components/TextWithBorder";

const contactItems = [
    {
        label: "📞 Phone: +123 456 789",
        link: "tel:+123456789",
    },
    {
        label: "💬 WhatsApp: https://wa.me/123456789",
        link: "https://wa.me/123456789",
    },
    {
        label: "✉️ Email: contact@example.com",
        link: "mailto:contact@example.com",
    },
    {
        label: "🏢 Name: Company Name",
    },
    {
        label: "📍 Address: 123 Main Street, City, Country",
    },
];

export default function Contact() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

            {contactItems.map((item, idx) => {
                const content = (
                    <TextWithBorder key={idx} selectable>
                        {item.label}
                    </TextWithBorder>
                );

                return item.link ? (
                    <TouchableOpacity key={idx} onPress={() => Linking.openURL(item.link!)} activeOpacity={0.7}>
                        {content}
                    </TouchableOpacity>
                ) : (
                    content
                );
            })}

            <Text style={styles.socialTitle}>Follow us</Text>

            <View style={styles.socialIcons}>
                <TouchableOpacity
                    onPress={() => Linking.openURL("https://wa.me/123456789")}
                    style={styles.iconTouch}
                    activeOpacity={0.7}
                >
                    <FontAwesome5 name="whatsapp" size={28} color="#25D366" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Linking.openURL("https://facebook.com/page")}
                    style={styles.iconTouch}
                    activeOpacity={0.7}
                >
                    <FontAwesome5 name="facebook-square" size={28} color="#1877F2" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Linking.openURL("https://instagram.com/profile")}
                    style={styles.iconTouch}
                    activeOpacity={0.7}
                >
                    <FontAwesome5 name="instagram" size={28} color="#C13584" />
                </TouchableOpacity>
            </View>
        </ScrollView>
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
    socialTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
    },
    socialIcons: {
        flexDirection: "row",
        marginTop: 10,
        gap: 20,
    },
    iconTouch: {
        padding: 8,
    },
});
