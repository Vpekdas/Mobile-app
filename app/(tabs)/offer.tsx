import { BASIC_LOGO } from "@/constants";
import { useTranslation } from "react-i18next";
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Logo from "../components/Logo";
import TextWithBorder from "../components/TextWithBorder";

const { height: screenHeight } = Dimensions.get("window");

export default function Offer() {
    const { t } = useTranslation();

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />
                    <View style={styles.offerContainer}>
                        <TextWithBorder children={t("offersAndPromotions")}></TextWithBorder>
                        <TextWithBorder children={t("advertising")}></TextWithBorder>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
    offerContainer: {
        flexGrow: 1,
        padding: 16,
        backgroundColor: "white",
        alignItems: "center",
        gap: 10,
        width: "100%",
    },
    image: {
        width: "100%",
        height: screenHeight * 0.45,
        marginBottom: 20,
        borderRadius: 10,
    },
    textContainer: {
        width: "100%",
        gap: 3,
    },
    text: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
    },
    news: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        gap: 20,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Android shadow
        elevation: 5,
        justifyContent: "space-around",
    },
});
