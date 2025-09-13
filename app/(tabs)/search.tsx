import { db } from "@/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, View } from "react-native";
import Result from "../components/Result";
import SearchBar from "../components/SearchBar";

export default function Search() {
    const [queryText, setQueryText] = useState("");
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (queryText.trim().length === 0) {
            setResults([]);
            return;
        }

        const fetchResults = async () => {
            try {
                const colRef = collection(db, "establishments");

                const qFacility = query(
                    colRef,
                    where("facility", ">=", queryText),
                    where("facility", "<=", queryText + "\uf8ff")
                );

                const snapshot1 = await getDocs(qFacility);
                const docsFacility = snapshot1.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                const qSpecialty = query(colRef, where("specialty", "array-contains", queryText));

                const snapshot2 = await getDocs(qSpecialty);
                const docsSpecialty = snapshot2.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

                const merged = [...docsFacility];

                docsSpecialty.forEach((docSpec) => {
                    if (!merged.some((item) => item.id === docSpec.id)) {
                        merged.push(docSpec);
                    }
                });

                setResults(merged);
            } catch (error) {
                console.error("Error fetching data", error);
            }
        };

        fetchResults();
    }, [queryText]);

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
