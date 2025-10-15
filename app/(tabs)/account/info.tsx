import { BASIC_LOGO } from "@/constants";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import { useEffect, useState } from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Logo from "../../components/Logo";

export interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    type: "user" | "professional" | "";
    birthPlace: string;
    city: string;
    town: string;
    neighborhood: string;
    sex: "man" | "woman" | "other" | "";
    job: string;
}

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export default function Info() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("");
    const [birthPlace, setBirthPlace] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [sex, setSex] = useState("");
    const [job, setJob] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) return;

            try {
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as User;
                    setFirstName(data.firstName);
                    setLastName(data.lastName);
                    setBirthDate(data.birthDate);
                    setPhone(data.phone);
                    setEmail(data.email);
                    setType(data.type || "");
                    setBirthPlace(data.birthPlace);
                    setCity(data.city);
                    setTown(data.town);
                    setNeighborhood(data.neighborhood);
                    setSex(data.sex || "");
                    setJob(data.job);
                } else {
                    console.log("No such user document!");
                }

                const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
                const url = await getDownloadURL(imageRef);
                setProfileImage(url);
            } catch (error) {
                console.error("Error fetching user data or image:", error);
            }
        };

        fetchUserData();
    }, []);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    {profileImage && (
                        <Image
                            source={{ uri: profileImage }}
                            style={{ width: 100, height: 100, borderRadius: 50, marginBottom: 20 }}
                        />
                    )}

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>First Name: {firstName}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Last Name: {lastName}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Email: {email}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Phone: {phone}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Birth Date: {birthDate}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Birth Place: {birthPlace}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>City: {city}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Town: {town}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Neighborhood: {neighborhood}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Sex: {sex}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Job: {job}</Text>
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>Account Type: {type}</Text>
                    </View>
                </ScrollView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        padding: 20,
        alignItems: "center",
        gap: 25,
        paddingBottom: 100,
        backgroundColor: "white",
    },
    labeledField: {
        width: "100%",
        alignItems: "center",
        gap: 4,
    },
    label: {
        width: "80%",
        fontWeight: "bold",
        fontSize: 16,
        color: "#333",
    },
});
