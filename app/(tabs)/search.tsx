import { useNavigation } from "@react-navigation/native";
import { LocationObjectCoords } from "expo-location";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
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
import { db } from "../../firebase";
import { getLocation, haversine, normalizeString } from "../../utils/Location";
import Result from "../components/Result";
import SearchBar from "../components/SearchBar";
import { FormData } from "./pro";

async function fetchSearchResults(queryText: string, userLocation: LocationObjectCoords | null) {
    if (queryText.trim().length === 0) return [];

    const normalizedQuery = normalizeString(queryText);
    const colRef = collection(db, "establishments");

    const qFacility = query(
        colRef,
        where("facility_search", ">=", normalizedQuery),
        where("facility_search", "<=", normalizedQuery + "\uf8ff")
    );
    const snapshotFacility = await getDocs(qFacility);
    const facilityResults = snapshotFacility.docs.map((doc) => doc.data() as FormData);

    const qKeywords = query(colRef, where("searchKeywords", "array-contains", normalizedQuery));
    const snapshotKeywords = await getDocs(qKeywords);
    const keywordResults = snapshotKeywords.docs.map((doc) => doc.data() as FormData);

    const allResultsMap = new Map<string, FormData>();
    [...facilityResults, ...keywordResults].forEach((item) => {
        const key = item.facility + "_" + item.city;
        allResultsMap.set(key, item);
    });
    const results = Array.from(allResultsMap.values());

    const resultsWithDistance: FormData[] = results.map((data) => {
        const { latitude, longitude } = data;
        if (userLocation && latitude && longitude) {
            const distance = haversine(userLocation.latitude, userLocation.longitude, latitude, longitude).toFixed(2);
            return { ...data, distance };
        }
        return { ...data, distance: "Location not available" };
    });

    return resultsWithDistance
        .filter((item) => item.distance !== "Location not available")
        .sort((a, b) => parseFloat(a.distance as string) - parseFloat(b.distance as string))
        .slice(0, 20);
}

export default function Search() {
    const { t } = useTranslation();

    const [queryText, setQueryText] = useState("");
    const [results, setResults] = useState<FormData[]>([]);
    const [userLocation, setUserLocation] = useState<LocationObjectCoords | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [debouncedQuery, setDebouncedQuery] = useState(queryText);

    const navigation = useNavigation();

    // Memoize navigation handler to avoid unnecessary re-renders.
    const handleResultPress = useCallback(
        (item: FormData, navigation: any) => {
            navigation.navigate("detail", { itemData: item });
        },
        [navigation]
    );

    useEffect(() => {
        const fetchLocation = async () => {
            const coords = await getLocation();
            if (coords) {
                setUserLocation(coords);
            }
        };
        fetchLocation();
    }, []);

    // Does a query only after few times user finish typing.
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedQuery(queryText);
        }, 300);

        return () => clearTimeout(handler);
    }, [queryText]);

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError(null);

            try {
                const results = await fetchSearchResults(debouncedQuery, userLocation);
                setResults(results);
            } catch (e) {
                setError(t("failedToFetchResults"));
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [debouncedQuery, userLocation]);

    return (
        <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <View style={styles.container}>
                    <SearchBar value={queryText} onChangeText={setQueryText} placeholder={t("searchFacility")} />
                    {loading && <Text style={styles.loadingText}>{t("loading")}</Text>}
                    {error && <Text style={styles.errorText}>{error}</Text>}

                    <FlatList
                        data={results}
                        keyExtractor={(item, index) => `${normalizeString(item.facility)}-${index}`}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleResultPress(item, navigation)}>
                                <Result
                                    logo={{ uri: item.logo }}
                                    facility={item.facility}
                                    specialist={item.specialty?.join(", ") || ""}
                                    address={item.address}
                                    distance={isNaN(Number(item.distance)) ? "N/A" : `${item.distance} km`}
                                />
                            </TouchableOpacity>
                        )}
                        keyboardShouldPersistTaps="handled"
                        contentContainerStyle={styles.contentContainer}
                    />
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "white",
    },
    scrollView: {
        flex: 1,
    },
    contentContainer: {
        padding: 16,
        gap: 10,
    },
    loadingText: {
        padding: 16,
    },
    errorText: {
        padding: 16,
        color: "red",
    },
});
