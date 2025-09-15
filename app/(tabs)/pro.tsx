import { FontAwesome5 } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useEffect, useState } from "react";
import {
    FlatList,
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

import { db } from "@/firebase";
import { googleMapsApi } from "@/firebaseConfig";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import Geocoder from "react-native-geocoding";
import MultiSelect from "react-native-multiple-select";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";

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
}

export default function Pro() {
    const [editingField, setEditingField] = useState<string | null>(null);
    const [formData, setFormData] = useState<FormData>({
        facility: "Nom de l'établissement",
        address: "Adresse",
        type: "hospital",
        sector: "public",
        telephone: "Téléphone",
        specialty: ["Cardiologie"],
        country: "Pays",
        city: "Ville",
        postalCode: "Code postal",
    });

    const fields = [
        { key: "facility", label: "Établissement" },
        { key: "address", label: "Adresse" },
        { key: "country", label: "Pays" },
        { key: "city", label: "Ville" },
        { key: "postalCode", label: "Code postal" },
        { key: "type", label: "Type" },
        { key: "sector", label: "Secteur" },
        { key: "telephone", label: "Téléphone" },
        { key: "specialty", label: "Spécialité" },
    ];

    const pickerOptions: Record<string, { label: string; value: string }[]> = {
        type: [
            { label: "Hôpital", value: "hospital" },
            { label: "Clinique", value: "clinic" },
            { label: "Cabinet", value: "office" },
        ],
        sector: [
            { label: "Public", value: "public" },
            { label: "Privé", value: "private" },
        ],
    };

    const specialties = [
        { id: "Cardiologie", name: "Cardiologie" },
        { id: "Dermatologie", name: "Dermatologie" },
        { id: "Généraliste", name: "Généraliste" },
        { id: "Pédiatrie", name: "Pédiatrie" },
    ];

    const isPickerField = (key: string) => ["type", "sector"].includes(key);

    useEffect(() => {
        console.log("Google Maps API Key:", googleMapsApi);
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

    const handleChange = (key: keyof typeof formData, value: any) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    const renderField = (key: keyof typeof formData, label: string) => (
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
                            selectText="Choisir spécialités"
                            searchInputPlaceholderText="Rechercher spécialité..."
                            tagRemoveIconColor="#CCC"
                            tagBorderColor="#CCC"
                            tagTextColor="#5D737E"
                            selectedItemTextColor="#070670"
                            selectedItemIconColor="#070670"
                            itemTextColor="#5D737E"
                            displayKey="name"
                            searchInputStyle={{ color: "#CCC" }}
                            submitButtonColor="#070670"
                            submitButtonText="Valider"
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
                ) : key === "address" ? (
                    <InputField
                        value={formData.address}
                        onChangeText={(text) => handleAddressChange(text)}
                        textStyle={DEFAULT_NAME_STYLE}
                    />
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
                    {key === "specialty" ? formData.specialty.join(", ") : formData[key]}
                </Text>
            )}
            <TouchableOpacity onPress={() => setEditingField(editingField === key ? null : key)}>
                <FontAwesome5 name="edit" size={24} color="#4D4CB1" />
            </TouchableOpacity>
        </View>
    );

    const handleAddressChange = (address: string) => {
        setFormData((prev) => ({ ...prev, address }));
    };

    const handleSave = async () => {
        if (!formData.address || formData.address === "Adresse") {
            alert("Veuillez entrer une adresse valide.");
            return;
        }

        try {
            const response = await Geocoder.from(formData.address);
            console.log("Geocoder response:", response);

            if (response.results.length > 0) {
                const { lat, lng } = response.results[0].geometry.location;
                console.log("Latitude and Longitude:", lat, lng);

                const updatedFormData = { ...formData, latitude: lat, longitude: lng };

                console.log("FormData before saving:", updatedFormData);

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
            } else {
                alert("Adresse introuvable. Veuillez vérifier l'adresse.");
            }
        } catch (error) {
            console.error("Error geocoding address:", error);
            alert("Une erreur s'est produite lors de la géocodification. Veuillez réessayer.");
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <FlatList
                        data={fields}
                        keyExtractor={(item) => item.key}
                        renderItem={({ item }) => renderField(item.key as keyof typeof formData, item.label)}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{
                            flexGrow: 1,
                            justifyContent: "space-evenly",
                            padding: 16,
                            gap: 12,
                        }}
                    />
                    <CustomButton pressFunction={handleSave} title="Sauvegarder" />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
