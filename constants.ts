import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { LogoProps } from "./app/components/Logo";

export const BASIC_LOGO: LogoProps = {
    source: require("./assets/logo/logo.jpeg"),
    size: 100,
    style: {
        marginBottom: 50,
    },
};

export const PROFILE_PICTURE = {
    source: require("./assets/logo/profile.png"),
};

export const BASIC_PICKER = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        padding: 20,
        alignItems: "center",
        gap: 25,
    },
    pickerContainer: {
        width: "80%",
        borderWidth: 1,
        flexDirection: "row",
        borderColor: "#C0FDFB",
        borderRadius: 10,
        paddingHorizontal: 10,
        backgroundColor: "white",
    },
    picker: {
        flex: 1,
        color: "#5D737E",
        fontSize: 16,
    },
});

export type RootStackParamList = {
    Pro: { location?: { latitude: number; longitude: number } } | undefined;
    MapPicker: {
        onLocationSelected: (location: { latitude: number; longitude: number }) => void;
        location?: { latitude: number; longitude: number };
    };
};

export const DEFAULT_TEXT_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
};

export const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    borderWidth: 1,
    borderColor: "#64B6AC",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#DAFFEF",
};

export const PICKER_OPTIONS: Record<string, { label: string; value: string }[]> = {
    type: [
        { label: "Hospital", value: "hospital" },
        { label: "Clinic", value: "clinic" },
        { label: "Office", value: "office" },
    ],
    sector: [
        { label: "Public", value: "public" },
        { label: "Private", value: "private" },
    ],
};

export const SPECIALTIES = [
    { id: "cardiology", name: "Cardiology" },
    { id: "neurology", name: "Neurology" },
    { id: "pediatrics", name: "Pediatrics" },
    { id: "orthopedics", name: "Orthopedics" },
];

export const DEFAULT_OPENING_HOURS = [
    { day: "Monday", start: "", end: "" },
    { day: "Tuesday", start: "", end: "" },
    { day: "Wednesday", start: "", end: "" },
    { day: "Thursday", start: "", end: "" },
    { day: "Friday", start: "", end: "" },
    { day: "Saturday", start: "", end: "" },
    { day: "Sunday", start: "", end: "" },
];

export const PRO_FIELDS = [
    { key: "facility", label: "Facility" },
    { key: "address", label: "Address" },
    { key: "country", label: "Country" },
    { key: "city", label: "City" },
    { key: "postalCode", label: "Postal Code" },
    { key: "type", label: "Type" },
    { key: "sector", label: "Sector" },
    { key: "telephone", label: "Telephone" },
    { key: "specialty", label: "Specialty" },
    { key: "team", label: "Team Members" },
    { key: "openingHours", label: "Opening Hours" },
];
