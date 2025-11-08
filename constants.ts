import { StyleSheet, TextStyle, ViewStyle } from "react-native";
import { LogoProps } from "./app/components/Logo";

export const BASIC_LOGO: LogoProps = {
    source: require("./assets/logo/logo.jpeg"),
    size: 100,
    style: {
        marginBottom: 50,
    },
};

export const DEFAULT_PROFILE_PICTURE = {
    source: require("./assets/logo/default_profile.png"),
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



export const SPECIALTIES = [
    { id: "cardiology", name: "Cardiologie" },
    { id: "neurology", name: "Neurologie" },
    { id: "pediatrics", name: "Pediatrie" },
    { id: "orthopedics", name: "Orthopedie" },
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
    { key: "facility" },
    { key: "address" },
    { key: "country" },
    { key: "city" },
    { key: "postalCode" },
    { key: "type" },
    { key: "sector" },
    { key: "telephone" },
    { key: "specialty" },
    { key: "team" },
    { key: "openingHours" },
];

export const REGISTER_FIELDS = [
    { key: "firstName", label: "firstName", placeholder: "firstName" },
    { key: "lastName", label: "lastName", placeholder: "lastName" },
    { key: "birthPlace", label: "birthPlace", placeholder: "birthPlace" },
    { key: "city", label: "city", placeholder: "city" },
    { key: "town", label: "town", placeholder: "town" },
    { key: "neighborhood", label: "neighborhood", placeholder: "neighborhood" },
    { key: "phone", label: "phone", placeholder: "phone" },
    { key: "job", label: "job", placeholder: "job" },
    { key: "email", label: "email", placeholder: "email" },
];

export const USER_FIELDS = [
    { key: "firstName", label: "firstName" },
    { key: "lastName", label: "lastName" },
    { key: "email", label: "email" },
    { key: "phone", label: "phone" },
    { key: "birthDate", label: "birthDate" },
    { key: "birthPlace", label: "birthPlace" },
    { key: "city", label: "city" },
    { key: "town", label: "town" },
    { key: "neighborhood", label: "neighborhood" },
    { key: "sex", label: "sex" },
    { key: "job", label: "job" },
    { key: "type", label: "accountType" },
];
