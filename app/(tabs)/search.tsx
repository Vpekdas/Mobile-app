import { db } from "@/firebase";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
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

export default function Search() {
    const [queryText, setQueryText] = useState("");
    const [results, setResults] = useState<FormData[]>([]);
    const [userLocation, setUserLocation] = useState<any>(null);

    const getLocation = async () => {
        const { status } = await requestForegroundPermissionsAsync();
        if (status !== "granted") {
            alert("Permission to access location was denied.");
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
                const colRef = collection(db, "establishments");

                const q = query(
                    colRef,
                    where("facility", ">=", queryText),
                    where("facility", "<=", queryText + "\uf8ff")
                );

                const qSpecialty = query(colRef, where("specialty", "array-contains", queryText));

                const snapshotFacility = await getDocs(q);
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

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={{ flex: 1 }}>
                    <SearchBar
                        value={queryText}
                        onChangeText={setQueryText}
                        placeholder="Chercher un établissement ou spécialité"
                    />
                    <ScrollView
                        style={{ flex: 1 }}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={{ padding: 16, gap: 10 }}
                    >
                        {results.map((item, index) => (
                            <Result
                                key={item.id || index}
                                logo={item.logo ? { uri: item.logo } : require("../../assets/news.png")}
                                facility={item.facility}
                                specialist={item.specialty ? item.specialty.join(", ") : ""}
                                address={item.address}
                                distance={item.distance || "N/A"}
                            />
                        ))}
                    </ScrollView>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}
