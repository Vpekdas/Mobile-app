import { db } from "@/firebase";
import { useNavigation } from "@react-navigation/native";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Result from "../components/Result";
import SearchBar from "../components/SearchBar";
import { FormData } from "./pro";

const haversine = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

function normalizeString(str: string) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();
}

export default function Search() {
    const [queryText, setQueryText] = useState("");
    const [results, setResults] = useState<FormData[]>([]);
    const [userLocation, setUserLocation] = useState<any>(null);

    const navigation = useNavigation();

    const getLocation = async () => {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
            return;
        }

        const { coords } = await getCurrentPositionAsync({});
        setUserLocation(coords);
    };

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        if (queryText.trim().length === 0) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            try {
                const normalizedQuery = normalizeString(queryText);

                const colRef = collection(db, "establishments");

                const qFacility = query(
                    colRef,
                    where("facility_search", ">=", normalizedQuery),
                    where("facility_search", "<=", normalizedQuery + "\uf8ff")
                );

                const qSpecialty = query(colRef, where("specialty_search", "array-contains", normalizedQuery));

                const snapshotFacility = await getDocs(qFacility);
                const snapshotSpecialty = await getDocs(qSpecialty);

                const merged: FormData[] = [
                    ...snapshotFacility.docs.map((doc) => doc.data() as FormData),
                    ...snapshotSpecialty.docs.map((doc) => doc.data() as FormData),
                ];

                const resultsWithDistance: FormData[] = merged.map((data) => {
                    const { latitude, longitude } = data;

                    if (userLocation && latitude && longitude) {
                        const distance = haversine(
                            userLocation.latitude,
                            userLocation.longitude,
                            latitude,
                            longitude
                        ).toFixed(2);
                        return { ...data, distance };
                    } else {
                        return { ...data, distance: "Location not available" };
                    }
                });

                const sortedResults = resultsWithDistance
                    .filter((item) => item.distance !== "Location not available" && item.distance !== null)
                    .sort((a: FormData, b: FormData) => {
                        const distanceA = parseFloat(a.distance as string);
                        const distanceB = parseFloat(b.distance as string);
                        return distanceA - distanceB;
                    });

                setResults(sortedResults);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchResults();
    }, [queryText, userLocation]);

    const handleResultPress = (item: FormData, navigation: any) => {
        navigation.navigate("detail", { itemData: item });
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1, backgroundColor: "white" }}>
                    <SearchBar value={queryText} onChangeText={setQueryText} placeholder="Search facility" />
                    <ScrollView
                        style={{ flex: 1 }}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ padding: 16, gap: 10 }}
                    >
                        {results.map((item, index) => (
                            <TouchableOpacity
                                key={item.id || index}
                                onPress={() => handleResultPress(item, navigation)}
                            >
                                <Result
                                    logo={{ uri: item.logo }}
                                    facility={item.facility}
                                    specialist={item.specialty ? item.specialty.join(", ") : ""}
                                    address={item.address}
                                    distance={item.distance + " km" || "N/A"}
                                />
                            </TouchableOpacity>
                        ))}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
