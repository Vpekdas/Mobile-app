import React from "react";
import {
    Dimensions,
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

const { height: screenHeight } = Dimensions.get("window");

export default function Home() {
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Image source={require("../../assets/logo/home.jpeg")} style={styles.image} resizeMode="cover" />
                    <View style={styles.news}>
                        <View style={styles.textContainer}>
                            <Text style={styles.text}>Nous vous aidons à trouver vos professionnels</Text>
                            <Text style={styles.text}>La suite c'est vous qui décider</Text>
                        </View>
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
        textAlign: "center"
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
