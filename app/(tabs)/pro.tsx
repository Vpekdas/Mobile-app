import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Geocoder from "react-native-geocoding";

import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

import { db } from "@/firebase";
import { googleMapsApi } from "@/firebaseConfig";

import { DEFAULT_OPENING_HOURS, PICKER_OPTIONS, PRO_FIELDS, SPECIALTIES } from "@/constants";
import { FacilityType, Sector } from "@/types/enums";
import { saveFacilityData } from "@/types/helpers/saveFacilityHelper";
import { onTimeChangeHelper, openTimePickerHelper } from "@/types/helpers/timePickerHelper";
import { getStorage } from "firebase/storage";
import CustomButton from "../components/CustomButton";
import ImagePickerComponent from "../components/ImagePickerComponent";
import InputField from "../components/InputField";
import NewTeamMemberForm from "../components/NewTeamMemberForm";
import OpeningHoursPicker from "../components/OpeningHoursPicker";
import SpecialtySelector from "../components/SpecialtySelector";
import TeamMemberList from "../components/TeamMemberList";

const storage = getStorage();

export interface TeamMember {
    name: string;
    specialty: string[];
    phone: string;
}

export interface OpeningHours {
    day: string;
    start: string;
    end: string;
}

type FormData = {
    facility: string;
    address: string;
    country: string;
    city: string;
    postalCode: string;
    type: FacilityType;
    sector: Sector;
    telephone: string;
    specialty: string[];
    latitude?: number;
    longitude?: number;
    team?: TeamMember[];
    openingHours?: OpeningHours[];
    logo?: string;
};

export default function Pro() {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        facility: "",
        address: "",
        type: FacilityType.HOSPITAL,
        sector: Sector.PUBLIC,
        telephone: "",
        specialty: [],
        country: "",
        city: "",
        postalCode: "",
        team: [],
        openingHours: DEFAULT_OPENING_HOURS,
    });
    const [facilityImage, setFacilityImage] = useState<string | null>(null);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [timePickerDayIndex, setTimePickerDayIndex] = useState<number | null>(null);
    const [timePickerType, setTimePickerType] = useState<"start" | "end" | null>(null);
    const [timePickerValue, setTimePickerValue] = useState(new Date());

    const isPickerField = (key: string) => ["type", "sector"].includes(key);

    useEffect(() => {
        if (googleMapsApi) {
            Geocoder.init(googleMapsApi);
            console.log("Geocoder initialized successfully");
        } else {
            console.error("Google Maps API key is missing.");
        }
    }, []);

    useEffect(() => {
        const fetchFacilityData = async () => {
            const auth = getAuth();
            const user = auth.currentUser;

            if (user) {
                const docRef = doc(db, "establishments", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as FormData;
                    setFormData({
                        ...data,
                        openingHours: data.openingHours ?? DEFAULT_OPENING_HOURS,
                    });

                    if (data.logo) {
                        setFacilityImage(data.logo);
                    }

                    console.log("User facility data fetched:", data);
                }
            } else {
                console.log("No authenticated user found.");
            }
        };

        fetchFacilityData();
    }, []);

    const handleChange = (key: keyof FormData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const handleSave = async () => {
        const success = await saveFacilityData(formData, facilityImage);
        if (success) {
            Alert.alert("Success", "Facility data saved successfully");
        } else {
            Alert.alert("Error", "Something went wrong. Please try again.");
        }
    };

    const openTimePicker = (dayIndex: number, type: "start" | "end") => {
        openTimePickerHelper(
            dayIndex,
            type,
            formData,
            setTimePickerDayIndex,
            setTimePickerType,
            setTimePickerValue,
            setShowTimePicker
        );
    };

    const onTimeChange = (event: any, selectedDate?: Date) => {
        onTimeChangeHelper(event, selectedDate, timePickerDayIndex, timePickerType, setFormData, setShowTimePicker);
    };

    const renderField = (key: keyof FormData, label: string) => {
        // Helper function to render the correct component based on the field type.
        const renderFieldEditor = () => {
            if (key === "team") {
                return (
                    <View style={{ flex: 1, width: "100%" }}>
                        <TeamMemberList
                            team={formData.team || []}
                            onChangeTeam={(updatedTeam) => handleChange("team", updatedTeam)}
                        />
                        <NewTeamMemberForm
                            specialties={SPECIALTIES}
                            onAddMember={(newMember) => handleChange("team", [...(formData.team || []), newMember])}
                        />
                    </View>
                );
            }

            if (key === "openingHours") {
                return (
                    <OpeningHoursPicker
                        openingHours={formData.openingHours || []}
                        defaultOpeningHours={DEFAULT_OPENING_HOURS}
                        openTimePicker={openTimePicker}
                        showTimePicker={showTimePicker}
                        timePickerValue={timePickerValue}
                        onTimeChange={onTimeChange}
                    />
                );
            }

            if (key === "specialty") {
                return (
                    <SpecialtySelector
                        specialties={SPECIALTIES}
                        selectedItems={formData.specialty}
                        onSelectedItemsChange={(selectedItems) => handleChange("specialty", selectedItems)}
                    />
                );
            }

            if (isPickerField(key)) {
                return (
                    <Picker
                        selectedValue={formData[key]}
                        onValueChange={(value) => handleChange(key, value)}
                        style={{ flex: 1 }}
                    >
                        {PICKER_OPTIONS[key].map((option) => (
                            <Picker.Item label={option.label} value={option.value} key={option.value} />
                        ))}
                    </Picker>
                );
            }

            return (
                <InputField
                    value={formData[key] as string}
                    onChangeText={(text) => handleChange(key, text)}
                    containerStyle={{ flex: 1 }}
                    textStyle={styles.text}
                />
            );
        };

        // Helper function to render the display view when not in edit mode.
        const renderFieldDisplay = () => {
            if (key === "specialty") {
                return formData.specialty.join(", ");
            }

            if (key === "team") {
                return formData.team && formData.team.length > 0
                    ? formData.team.map((member) => member.name).join(", ")
                    : "No team members";
            }

            if (key === "openingHours") {
                return (
                    <View style={styles.openingHoursContainer}>
                        {formData.openingHours && formData.openingHours.length > 0 ? (
                            formData.openingHours.map(({ day, start, end }, index) => (
                                <View key={index} style={styles.openingHoursRow}>
                                    <Text style={styles.openingHoursDay}>{day}:</Text>
                                    <Text style={styles.openingHoursTime}>
                                        {start || "N/A"} - {end || "N/A"}
                                    </Text>
                                </View>
                            ))
                        ) : (
                            <Text style={styles.openingHoursText}>No opening hours</Text>
                        )}
                    </View>
                );
            }

            return formData[key] as string;
        };

        return (
            <View key={key} style={styles.container}>
                {editingField === key ? renderFieldEditor() : <Text style={styles.text}>{renderFieldDisplay()}</Text>}
                <TouchableOpacity onPress={() => setEditingField(editingField === key ? null : key)}>
                    <FontAwesome5 name="edit" size={24} color="#4D4CB1" />
                </TouchableOpacity>
            </View>
        );
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <FlatList
                    data={PRO_FIELDS}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => renderField(item.key as keyof FormData, item.label)}
                    contentContainerStyle={styles.content}
                    keyboardShouldPersistTaps="handled"
                    ListFooterComponent={
                        <>
                            <View style={styles.image}>
                                <ImagePickerComponent
                                    selectedImage={facilityImage}
                                    onImageSelected={(imageUri) => setFacilityImage(imageUri)}
                                    onImageError={(error) => console.error("ImagePicker error:", error)}
                                />
                            </View>
                            <CustomButton pressFunction={handleSave} title="Save" />
                        </>
                    }
                    nestedScrollEnabled={true}
                />
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
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
    },
    text: {
        color: "#5D737E",
        fontSize: 16,
        fontWeight: "bold",
        flex: 1,
    },
    content: {
        padding: 16,
        gap: 30,
        alignItems: "center",
        backgroundColor: "white",
        flexGrow: 1,
    },
    image: {
        alignItems: "center",
        marginBottom: 20,
    },
    openingHoursContainer: {
        width: "100%",
        paddingTop: 10,
    },
    openingHoursRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
        paddingVertical: 5,
    },
    openingHoursDay: {
        fontWeight: "bold",
        color: "#5D737E",
        fontSize: 16,
    },
    openingHoursTime: {
        color: "#5D737E",
        fontSize: 16,
        fontWeight: "normal",
    },
    openingHoursText: {
        color: "#5D737E",
        fontSize: 16,
    },
});
