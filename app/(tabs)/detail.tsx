import { useRoute } from "@react-navigation/native";
import { Image, StyleSheet, Text, TextStyle, View, ViewStyle } from "react-native";

type RouteParams = {
    itemData: {
        id: string;
        logo?: string;
        facility: string;
        address: string;
        country: string;
        city: string;
        postalCode: string;
        type: "hospital" | "clinic" | "office";
        sector: "public" | "private";
        telephone: string;
        specialty: string[];
        latitude?: number;
        longitude?: number;
        distance?: string;
    };
};

export default function Detail() {
    const route = useRoute();
    const { itemData } = route.params as RouteParams;

    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                {itemData.logo ? (
                    <Image source={{ uri: itemData.logo }} style={styles.logoImage} resizeMode="contain" />
                ) : (
                    <Text>No logo available</Text>
                )}
            </View>

            <View style={DEFAULT_CONTAINER_STYLE}>
                <Text style={DEFAULT_TEXT_STYLE}>{itemData.facility}</Text>
            </View>

            <View style={DEFAULT_CONTAINER_STYLE}>
                <Text style={DEFAULT_TEXT_STYLE}>{itemData.address}</Text>
            </View>

            <View style={DEFAULT_CONTAINER_STYLE}>
                <Text style={DEFAULT_TEXT_STYLE}>{itemData.type}</Text>
            </View>

            <View style={DEFAULT_CONTAINER_STYLE}>
                <Text style={DEFAULT_TEXT_STYLE}>{itemData.sector}</Text>
            </View>

            <View style={DEFAULT_CONTAINER_STYLE}>
                <Text style={DEFAULT_TEXT_STYLE}>{itemData.telephone}</Text>
            </View>

            {itemData.specialty.length > 0 && (
                <View style={DEFAULT_CONTAINER_STYLE}>
                    <Text style={DEFAULT_TEXT_STYLE}>{itemData.specialty.join(", ")}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
        padding: 16,
        justifyContent: "center",
        alignItems: "center",
        gap: 10,
    },
    logoContainer: {
        marginBottom: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    logoImage: {
        width: 150,
        height: 150,
        borderRadius: 10,
    },
});

const DEFAULT_TEXT_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
};

const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    borderWidth: 1,
    borderColor: "#64B6AC",
    flexDirection: "row",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#DAFFEF",
    alignSelf: "center",
    justifyContent: "space-between",
    alignItems: "center",
};
