import { BASIC_LOGO, DEFAULT_CONTAINER_STYLE, DEFAULT_TEXT_STYLE } from "@/constants";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import Logo from "../components/Logo";

export default function Legal() {
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

            <View style={DEFAULT_CONTAINER_STYLE}>
                <Text style={DEFAULT_TEXT_STYLE}>Legal</Text>
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
});
