import { BASIC_LOGO, BASIC_PICKER } from "@/constants";
import { auth, db } from "@/firebase";
import { Picker } from "@react-native-picker/picker";
import * as ImagePicker from "expo-image-picker";
import { router } from "expo-router";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { useState } from "react";
import {
    Image,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import ImageResizer from "react-native-image-resizer";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import Logo from "../components/Logo";

const storage = getStorage();

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

export default function Register() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthDate, setBirthDate] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [type, setType] = useState("default");
    const [birthPlace, setBirthPlace] = useState("");
    const [city, setCity] = useState("");
    const [town, setTown] = useState("");
    const [neighborhood, setNeighborhood] = useState("");
    const [sex, setSex] = useState("default");
    const [job, setJob] = useState("");
    const [password, setPassword] = useState("");
    const [profileImage, setProfileImage] = useState<string | null>(null);

    const handleCreateAccountPress = async () => {
        if (
            !firstName ||
            !lastName ||
            !birthDate ||
            !phone ||
            !email ||
            !birthPlace ||
            !city ||
            !town ||
            !neighborhood ||
            !job ||
            !password ||
            type === "default" ||
            sex === "default"
        ) {
            alert("Please fill all mandatory fields marked with *");
            return;
        }

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await sendEmailVerification(user);

            let profileImageUrl = null;

            if (profileImage) {
                const response = await fetch(profileImage);
                const blob = await response.blob();

                const storageRef = ref(storage, `profileImages/${user.uid}/profile.jpg`);
                await uploadBytes(storageRef, blob);

                profileImageUrl = await getDownloadURL(storageRef);
            }

            const newUser: User & { profileImageUrl?: string } = {
                firstName,
                lastName,
                birthDate,
                phone,
                email,
                type: type as User["type"],
                birthPlace,
                city,
                town,
                neighborhood,
                sex: sex as User["sex"],
                job,
                ...(profileImageUrl && { profileImageUrl }),
            };

            await setDoc(doc(db, "users", user.uid), newUser);
            router.replace("/confirmMail");
        } catch (error: any) {
            console.error("Error creating account", error?.message || error);
        }
    };

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

                setProfileImage(resizedImage.uri);
            } catch (error) {
                console.error("Error resizing image:", error);
            }
        } else {
            console.log("User canceled image picking.");
        }
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            First Name <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField
                            placeholder="FirstName"
                            onChangeText={setFirstName}
                            value={firstName}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Last Name <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField
                            placeholder="LastName"
                            onChangeText={setLastName}
                            value={lastName}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Birth Date <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField
                            placeholder="BirthDate"
                            onChangeText={setBirthDate}
                            value={birthDate}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Birth Place <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField
                            placeholder="BirthPlace"
                            onChangeText={setBirthPlace}
                            value={birthPlace}
                            secureTextEntry={false}
                        />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            City <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField placeholder="City" onChangeText={setCity} value={city} secureTextEntry={false} />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Town <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField placeholder="Town" onChangeText={setTown} value={town} secureTextEntry={false} />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Neighborhood <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField
                            placeholder="Neighborhood"
                            onChangeText={setNeighborhood}
                            value={neighborhood}
                            secureTextEntry={false}
                        />
                    </View>

                    <Picker
                        selectedValue={sex}
                        onValueChange={(itemValue) => setSex(itemValue)}
                        style={BASIC_PICKER.pickerContainer}
                        itemStyle={BASIC_PICKER.picker}
                    >
                        <Picker.Item label="Sex" value="default" />
                        <Picker.Item label="man" value="man" />
                        <Picker.Item label="woman" value="woman" />
                        <Picker.Item label="other" value="other" />
                    </Picker>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Job <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField placeholder="Job" onChangeText={setJob} value={job} secureTextEntry={false} />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Phone <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField placeholder="Phone" onChangeText={setPhone} value={phone} secureTextEntry={false} />
                    </View>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Email <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField placeholder="Mail" onChangeText={setEmail} value={email} secureTextEntry={false} />
                    </View>

                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={BASIC_PICKER.pickerContainer}
                        itemStyle={BASIC_PICKER.picker}
                    >
                        <Picker.Item label="User Type" value="default" />
                        <Picker.Item label="user" value="user" />
                        <Picker.Item label="professional" value="professional" />
                    </Picker>

                    <View style={styles.labeledField}>
                        <Text style={styles.label}>
                            Password <Text style={styles.required}>*</Text>
                        </Text>
                        <InputField
                            placeholder="Password"
                            onChangeText={setPassword}
                            value={password}
                            secureTextEntry={true}
                        />
                    </View>

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

                    <CustomButton pressFunction={handleCreateAccountPress} title={"Create account"} />
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
    required: {
        color: "#070670",
    },
});
