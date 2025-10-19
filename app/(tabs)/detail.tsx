import { DEFAULT_CONTAINER_STYLE, DEFAULT_TEXT_STYLE } from "@/constants";
import { useRoute } from "@react-navigation/native";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import TextWithBorder from "../components/TextWithBorder";
import { OpeningHours, TeamMember } from "./pro";
type RouteParams = {
    itemData: {
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
        team?: TeamMember[];
        openingHours?: OpeningHours[];
    };
};

export default function Detail() {
    const route = useRoute();
    const { itemData } = route.params as RouteParams;

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    {itemData.logo ? (
                        <Image source={{ uri: itemData.logo }} style={styles.logoImage} resizeMode="contain" />
                    ) : (
                        <Text>No logo available</Text>
                    )}
                </View>

                <TextWithBorder selectable>{itemData.facility}</TextWithBorder>
                <TextWithBorder selectable>{itemData.address}</TextWithBorder>
                <TextWithBorder selectable>{itemData.type}</TextWithBorder>
                <TextWithBorder selectable>{itemData.sector}</TextWithBorder>
                <TextWithBorder selectable>{itemData.telephone}</TextWithBorder>

                {itemData.specialty.length > 0 && (
                    <View style={DEFAULT_CONTAINER_STYLE}>
                        <Text style={DEFAULT_TEXT_STYLE}>{itemData.specialty.join(", ")}</Text>
                    </View>
                )}

                {itemData.team && itemData.team.length > 0 && (
                    <View style={DEFAULT_CONTAINER_STYLE}>
                        <Text style={styles.sectionTitle}>Team Members:</Text>
                        {itemData.team.map((member, index) => (
                            <View key={index} style={styles.teamMemberContainer}>
                                <Text style={styles.teamMemberName}>{member.name}</Text>
                                <Text style={styles.teamMemberSpecialty}>
                                    Specialties: {member.specialty.join(", ")}
                                </Text>
                                <Text style={styles.teamMemberPhone}>Phone: {member.phone}</Text>
                            </View>
                        ))}
                    </View>
                )}

                {itemData.openingHours && itemData.openingHours.length > 0 && (
                    <View style={DEFAULT_CONTAINER_STYLE}>
                        <Text style={styles.sectionTitle}>Opening Hours:</Text>
                        {itemData.openingHours.map((entry, index) => (
                            <View
                                key={index}
                                style={styles.openingHoursRow}
                            >
                                <Text style={styles.openingDay}>{entry.day}</Text>
                                <Text style={styles.openingTime}>
                                    {entry.start} - {entry.end}
                                </Text>
                            </View>
                        ))}
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: "white",
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
    openingHoursRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
        color: "#2C3E50",
    },
    teamMemberContainer: {
        paddingVertical: 6,
        borderBottomWidth: 1,
        borderColor: "#CCC",
    },
    teamMemberName: {
        fontSize: 16,
        fontWeight: "600",
        color: "#34495E",
    },
    teamMemberSpecialty: {
        fontSize: 14,
        color: "#7F8C8D",
        marginTop: 2,
    },
    teamMemberPhone: {
        fontSize: 14,
        color: "#2980B9",
        marginTop: 2,
    },
    openingDay: {
        fontWeight: "600",
        fontSize: 16,
        color: "#34495E",
    },
    openingTime: {
        fontSize: 16,
        color: "#7F8C8D",
    },
});
