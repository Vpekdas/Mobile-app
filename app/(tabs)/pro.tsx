import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
    ViewStyle,
} from "react-native";
import Geocoder from "react-native-geocoding";
import MultiSelect from "react-native-multiple-select";

import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

import { db } from "@/firebase";
import { googleMapsApi } from "@/firebaseConfig";
import * as ImagePicker from "expo-image-picker";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
const storage = getStorage();

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

const DEFAULT_NAME_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
};

export interface FormData {
    logo?: string;
    id?: string;
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
    facility_search?: string;
    specialty_search?: string[];
}

function normalizeString(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

export default function Pro() {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        facility: "facility",
        address: "address",
        type: "hospital",
        sector: "public",
        telephone: "telephone",
        specialty: ["specialty"],
        country: "country",
        city: "city",
        postalCode: "postalCode",
    });

    const fields = [
        { key: "facility", label: "Facility" },
        { key: "address", label: "Address" },
        { key: "country", label: "Country" },
        { key: "city", label: "City" },
        { key: "postalCode", label: "Postal Code" },
        { key: "type", label: "Type" },
        { key: "sector", label: "Sector" },
        { key: "telephone", label: "Telephone" },
        { key: "specialty", label: "Specialty" },
    ];

    const pickerOptions: Record<string, { label: string; value: string }[]> = {
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

    const specialties = [
        { id: "cardiology", name: "Cardiology" },
        { id: "neurology", name: "Neurology" },
        { id: "pediatrics", name: "Pediatrics" },
        { id: "orthopedics", name: "Orthopedics" },
    ];

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
                    setFormData(docSnap.data() as FormData);
                    console.log("User facility data fetched:", docSnap.data());
                } else {
                    console.log("No such document! Using default values.");
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
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            console.log("Selected image URI:", imageUri);
            setProfileImage(imageUri);
        } else {
            console.log("User canceled image picking");
        }
    };

    const renderField = (key: keyof FormData, label: string) => (
        <View key={key} style={DEFAULT_CONTAINER_STYLE}>
            {editingField === key ? (
                key === "specialty" ? (
                    <View style={{ flex: 1 }}>
                        <MultiSelect
                            hideTags
                            items={specialties}
                            uniqueKey="id"
                            onSelectedItemsChange={(selectedItems) => handleChange("specialty", selectedItems)}
                            selectedItems={formData.specialty}
                            selectText="Choose specialty"
                            searchInputPlaceholderText="Search specialty"
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#5D737E"
                            selectedItemTextColor="#070670"
                            selectedItemIconColor="#070670"
                            itemTextColor="#5D737E"
                            displayKey="name"
                            searchInputStyle={{ color: "#CCC" }}
                            submitButtonColor="#070670"
                            submitButtonText="Validate"
                            styleDropdownMenu={{
                                backgroundColor: "#e0f7fa",
                                borderRadius: 8,
                                borderWidth: 1,
                                borderColor: "#00796b",
                            }}
                            styleDropdownMenuSubsection={{
                                paddingLeft: 10,
                                borderColor: "#004d40",
                                borderWidth: 1,
                                borderRadius: 8,
                            }}
                        />
                    </View>
                ) : isPickerField(key) ? (
                    <Picker
                        selectedValue={formData[key]}
                        onValueChange={(value) => handleChange(key, value)}
                        style={{ flex: 1 }}
                    >
                        {pickerOptions[key].map((option) => (
                            <Picker.Item label={option.label} value={option.value} key={option.value} />
                        ))}
                    </Picker>
                ) : (
                    <InputField
                        value={formData[key] as string}
                        onChangeText={(text) => handleChange(key, text)}
                        containerStyle={{ flex: 1 }}
                        textStyle={DEFAULT_NAME_STYLE}
                    />
                )
            ) : (
                <Text style={DEFAULT_NAME_STYLE}>
                    {key === "specialty" ? formData.specialty.join(", ") : (formData[key] as string)}
                </Text>
            )}

            <TouchableOpacity onPress={() => setEditingField(editingField === key ? null : key)}>
                <FontAwesome5 name="edit" size={24} color="#4D4CB1" />
            </TouchableOpacity>
        </View>
    );

    const handleSave = async () => {
        try {
            let profileImageUrl = null;

            if (profileImage) {
                const response = await fetch(profileImage);
                const blob = await response.blob();

                const auth = getAuth();
                const user = auth.currentUser;

                if (!user) {
                    console.warn("No authenticated user found.");
                    return;
                }

                const storageRef = ref(storage, `profileImages/${user.uid}.jpg`);
                await uploadBytes(storageRef, blob);
                profileImageUrl = await getDownloadURL(storageRef);
            }

            const response = await Geocoder.from(formData.address);

            if (response.results.length > 0) {
                const { lat, lng } = response.results[0].geometry.location;

                const facility_search = normalizeString(formData.facility);
                const specialty_search = formData.specialty.map(normalizeString);

                const updatedFormData = {
                    ...formData,
                    latitude: lat,
                    longitude: lng,
                    facility_search,
                    specialty_search,
                    ...(profileImageUrl && { logo: profileImageUrl }),
                };

                const auth = getAuth();
                const user = auth.currentUser;

                if (!user) {
                    console.warn("No authenticated user found.");
                    return;
                }

                const estRef = doc(db, "establishments", user.uid);
                await setDoc(estRef, updatedFormData);
                setEditingField(null);
                console.log("Form data saved successfully.");
            }
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView
                    style={{ flex: 1 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        padding: 16,
                        gap: 30,
                        alignItems: "center",
                    }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View style={{ flex: 1, backgroundColor: "white" }}>
                        {fields.map((field) => renderField(field.key as keyof FormData, field.label))}

                        <View style={{ alignItems: "center", marginBottom: 20 }}>
                            <TouchableOpacity onPress={pickImage} style={{ marginBottom: 10 }}>
                                {profileImage ? (
                                    <Image
                                        source={{ uri: profileImage }}
                                        style={{ width: 100, height: 100, borderRadius: 50 }}
                                    />
                                ) : (
                                    <View
                                        style={{
                                            width: 100,
                                            height: 100,
                                            borderRadius: 50,
                                            backgroundColor: "#ccc",
                                            justifyContent: "center",
                                            alignItems: "center",
                                        }}
                                    >
                                        <Text>Select Profile Image</Text>
                                    </View>
                                )}
                            </TouchableOpacity>
                        </View>

                        <CustomButton pressFunction={handleSave} title="Save" />
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
