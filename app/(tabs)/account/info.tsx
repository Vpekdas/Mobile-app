import TextWithBorder from "@/app/components/TextWithBorder";
import { BASIC_LOGO } from "@/constants";
import { User } from "@/types/user";
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
    TouchableWithoutFeedback,
    View,
} from "react-native";
import Logo from "../../components/Logo";

const auth = getAuth();
const firestore = getFirestore();
const storage = getStorage();

export default function Info() {
    const [userData, setUserData] = useState<User | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (!user) {
                return;
            }

            try {
                const docRef = doc(firestore, "users", user.uid);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as User;
                    setUserData(data);
                }

                const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);
                const url = await getDownloadURL(imageRef);
                setProfileImage(url);
            } catch (error) {
                console.error("Failed to fetch user data:", error);
            }
        };

        fetchUserData();
    }, []);

    if (!userData) {
        return (
            <View style={styles.centered}>
                <TextWithBorder>User not found.</TextWithBorder>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    {profileImage && <Image source={{ uri: profileImage }} style={styles.profileImage} />}

                    <TextWithBorder>{`First Name: ${userData.firstName}`}</TextWithBorder>
                    <TextWithBorder>{`Last Name: ${userData.lastName}`}</TextWithBorder>
                    <TextWithBorder>{`Email: ${userData.email}`}</TextWithBorder>
                    <TextWithBorder>{`Phone: ${userData.phone}`}</TextWithBorder>
                    <TextWithBorder>{`Birth Date: ${userData.birthDate}`}</TextWithBorder>
                    <TextWithBorder>{`Birth Place: ${userData.birthPlace}`}</TextWithBorder>
                    <TextWithBorder>{`City: ${userData.city}`}</TextWithBorder>
                    <TextWithBorder>{`Town: ${userData.town}`}</TextWithBorder>
                    <TextWithBorder>{`Neighborhood: ${userData.neighborhood}`}</TextWithBorder>
                    <TextWithBorder>{`Sex: ${userData.sex}`}</TextWithBorder>
                    <TextWithBorder>{`Job: ${userData.job}`}</TextWithBorder>
                    <TextWithBorder>{`Account Type: ${userData.type}`}</TextWithBorder>
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
    centered: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});
