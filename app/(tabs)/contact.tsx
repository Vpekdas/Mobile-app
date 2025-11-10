import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BASIC_LOGO } from "../../constants";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useTranslation } from "react-i18next";
import Logo from "../components/Logo";
import TextWithBorder from "../components/TextWithBorder";

export default function Contact() {
    const { t } = useTranslation();

    const contactItems = [
        {
            label: "✉️ E-mail : nie.sante@outlook.fr",
        },
        {
            label: t("companyName") + "NiE",
        },
        {
            label: t("companyAddress"),
        },
    ];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

            <TextWithBorder children={t("companyPhone")}></TextWithBorder>

            {contactItems.map((item, idx) => {
                return (
                    <TextWithBorder key={idx} selectable>
                        {item.label}
                    </TextWithBorder>
                );
            })}

            <Text style={styles.socialTitle}>{t("followUs")}</Text>

            <View style={styles.socialIcons}>
                <TouchableOpacity
                    onPress={() => Linking.openURL("https://wa.me/123456789")}
                    style={styles.iconTouch}
                    activeOpacity={0.7}
                >
                    <FontAwesome5 name="whatsapp" size={28} color="#25D366" />
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => Linking.openURL("https://www.facebook.com/share/1BBiEK1nqU/")}
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
        padding: 10,
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
