import { BASIC_LOGO, PROFILE_PICTURE } from "@/constants";
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
import UserHeader from "../components/UserHeader";

export default function Home() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <UserHeader profilePicUri={PROFILE_PICTURE.source} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />
                    <View style={news.container}>
                        <Text> Comment fonctionne l application ?</Text>
                        <Text> Decouvrer nos services en cliquant ici </Text>
                        <Image
                            source={require("../../assets/news.png")}
                            style={{ width: "90%", height: "50%" }}
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
        justifyContent: "space-between",
        alignItems: "center",
        gap: 25,
    },
});

const news = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        backgroundColor: "#DAFFEF",
        padding: 15,
        borderRadius: 10,
        gap: 30,
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        // Android shadow
        elevation: 5,
    },
});
