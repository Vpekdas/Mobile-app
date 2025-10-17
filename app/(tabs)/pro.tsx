import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
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
import ImageResizer from "react-native-image-resizer";
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
    team?: TeamMember[];
}

export interface TeamMember {
    name: string;
    specialty: string[];
    phone: string;
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
        specialty: [],
        country: "country",
        city: "city",
        postalCode: "postalCode",
        team: [],
    });
    const [newTeamMember, setNewTeamMember] = useState<TeamMember>({
        name: "",
        specialty: [],
        phone: "",
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
        { key: "team", label: "Team Members" },
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
                    const data = docSnap.data() as FormData;
                    setFormData(data);

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
    const [facilityImage, setFacilityImage] = useState<string | null>(null);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled) {
            const imageUri = result.assets[0].uri;
            console.log("Selected image URI:", imageUri);

            try {
                const resizedImage = await ImageResizer.createResizedImage(imageUri, 800, 800, "JPEG", 80, 0);

                console.log("Resized image URI:", resizedImage.uri);

                setFacilityImage(resizedImage.uri);
            } catch (error) {
                console.error("Error resizing image:", error);
            }
        } else {
            console.log("User canceled image picking.");
        }
    };

    const renderField = (key: keyof FormData, label: string) => (
        <View key={key} style={DEFAULT_CONTAINER_STYLE}>
            {editingField === key ? (
                key === "team" ? (
                    <View style={{ flex: 1, width: "100%" }}>
                        {formData.team && formData.team.length > 0 ? (
                            formData.team.map((member, index) => (
                                <View
                                    key={index}
                                    style={{
                                        marginBottom: 10,
                                        padding: 10,
                                        borderWidth: 1,
                                        borderColor: "#64B6AC",
                                        borderRadius: 8,
                                    }}
                                >
                                    <InputField
                                        placeholder="Name"
                                        value={member.name}
                                        onChangeText={(text) => {
                                            const updatedTeam = [...formData.team!];
                                            updatedTeam[index].name = text;
                                            handleChange("team", updatedTeam);
                                        }}
                                        containerStyle={{ marginBottom: 5 }}
                                    />
                                    <InputField
                                        placeholder="Phone"
                                        value={member.phone}
                                        onChangeText={(text) => {
                                            const updatedTeam = [...formData.team!];
                                            updatedTeam[index].phone = text;
                                            handleChange("team", updatedTeam);
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => {
                                            const updatedTeam = formData.team!.filter((_, i) => i !== index);
                                            handleChange("team", updatedTeam);
                                        }}
                                        style={{ marginTop: 5 }}
                                    >
                                        <Text style={{ color: "red" }}>Remove</Text>
                                    </TouchableOpacity>
                                </View>
                            ))
                        ) : (
                            <Text>No team members added yet.</Text>
                        )}

                        <View
                            style={{
                                marginTop: 10,
                                padding: 10,
                                borderWidth: 1,
                                borderColor: "#64B6AC",
                                borderRadius: 8,
                            }}
                        >
                            <InputField
                                placeholder="Name"
                                value={newTeamMember.name}
                                onChangeText={(text) => setNewTeamMember({ ...newTeamMember, name: text })}
                                containerStyle={{ marginBottom: 5 }}
                            />
                            <View style={{ marginBottom: 10 }}>
                                <MultiSelect
                                    hideTags
                                    items={specialties}
                                    uniqueKey="id"
                                    onSelectedItemsChange={(selectedItems) =>
                                        setNewTeamMember((prev) => ({ ...prev, specialty: selectedItems }))
                                    }
                                    selectedItems={newTeamMember.specialty}
                                    selectText="Choose specialties"
                                    searchInputPlaceholderText="Search specialties"
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

                            <InputField
                                placeholder="Phone"
                                value={newTeamMember.phone}
                                onChangeText={(text) => setNewTeamMember({ ...newTeamMember, phone: text })}
                            />
                            <TouchableOpacity
                                onPress={() => {
                                    if (
                                        newTeamMember.name.trim() !== "" &&
                                        newTeamMember.specialty.length > 0 &&
                                        newTeamMember.phone.trim() !== ""
                                    ) {
                                        handleChange("team", [...(formData.team || []), newTeamMember]);
                                        setNewTeamMember({ name: "", specialty: [], phone: "" });
                                    } else {
                                        alert("Please fill all fields to add a team member");
                                    }
                                }}
                                style={{
                                    marginTop: 10,
                                    backgroundColor: "#4D4CB1",
                                    padding: 10,
                                    borderRadius: 8,
                                    alignItems: "center",
                                }}
                            >
                                <Text style={{ color: "white" }}>Add Team Member</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : key === "specialty" ? (
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
                    {key === "specialty"
                        ? formData.specialty.join(", ")
                        : key === "team"
                        ? formData.team && formData.team.length > 0
                            ? formData.team.map((member) => member.name).join(", ")
                            : "No team members"
                        : (formData[key] as string)}
                </Text>
            )}

            <TouchableOpacity onPress={() => setEditingField(editingField === key ? null : key)}>
                <FontAwesome5 name="edit" size={24} color="#4D4CB1" />
            </TouchableOpacity>
        </View>
    );

    const handleSave = async () => {
        console.log("saved button clicked !");

        try {
            let profileImageUrl = null;

            if (facilityImage) {
                const response = await fetch(facilityImage);
                const blob = await response.blob();

                const auth = getAuth();
                const user = auth.currentUser;

                if (!user) {
                    return;
                }

                const storageRef = ref(storage, `facilityImages/${user.uid}.jpg`);
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
                    Alert.alert("Error", "No authenticated user when saving");
                    return;
                }

                const estRef = doc(db, "establishments", user.uid);
                await setDoc(estRef, updatedFormData);

                setEditingField(null);
                Alert.alert("Success", "Facility data saved successfully");
            } else {
                Alert.alert("Error", "Geolocation not found");
            }
        } catch (error) {
            console.error("Save error:", error);
            Alert.alert("Error", "Something went wrong. Check console.");
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <FlatList
                    data={fields}
                    keyExtractor={(item) => item.key}
                    renderItem={({ item }) => renderField(item.key as keyof FormData, item.label)}
                    contentContainerStyle={{
                        padding: 16,
                        gap: 30,
                        alignItems: "center",
                        backgroundColor: "white",
                        flexGrow: 1,
                    }}
                    keyboardShouldPersistTaps="handled"
                    ListFooterComponent={
                        <>
                            <View style={{ alignItems: "center", marginBottom: 20 }}>
                                <TouchableOpacity onPress={pickImage} style={{ marginBottom: 10 }}>
                                    {facilityImage || formData.logo ? (
                                        <Image
                                            source={{ uri: facilityImage || formData.logo }}
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
                        </>
                    }
                    nestedScrollEnabled={true}
                />
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
