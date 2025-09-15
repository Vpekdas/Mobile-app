import { BASIC_LOGO } from "@/constants";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Logo from "../components/Logo";

export default function Home() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />
                    <View style={news.container}>
                        <View
                        style={textContainer.container}>
                            <Text> Nous vous aidons à trouver vos professionnels</Text>
                            <Text> La suite c'est vous qui décider</Text>
                        </View>
                        <Image
                            source={require("../../assets/news.png")}
                            style={{ width: "90%", height: "50%", marginBottom: 20 }}
                            resizeMode="cover"
                        />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        padding: 20,
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "white",
    },
});

const textContainer = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "space-evenly",
        alignItems: "center",
    },
});

const news = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#DAFFEF",
        padding: 15,
        borderRadius: 10,
        gap: 60,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Android shadow
        elevation: 5,
        justifyContent: "space-around"
    },
});
