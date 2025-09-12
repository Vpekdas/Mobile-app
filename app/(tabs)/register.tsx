import {
    BASIC_CUSTOM_BUTTON,
    BASIC_CUSTOM_BUTTON_TEXT,
    BASIC_INPUT_FIELD,
    BASIC_LOGO,
    BASIC_PICKER,
} from "@/constants";
import { auth, db } from "@/firebase";
import { Picker } from "@react-native-picker/picker";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
} from "react-native";
import CustomButton from "../components/CustomButton";
import InputField from "../components/InputField";
import Logo from "../components/Logo";

export interface User {
    firstName: string;
    lastName: string;
    birthDate: string;
    phone: string;
    email: string;
    type: "Usager" | "Professionnel" | "";
    birthPlace: string;
    city: string;
    town: string;
    neighborhood: string;
    sex: "homme" | "femme" | "autre" | "";
    job: string;
}

export default function Register() {
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
    const [password, setPassword] = useState("");

    const handleCreateAccountPress = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            const newUser: User = {
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
            };

            await setDoc(doc(db, "users", user.uid), newUser);
            alert("Compte créé avec succès !");
        } catch (error: any) {
            console.error("Erreur lors de la création du compte:", error?.message || error);
            alert(`Erreur lors de la création du compte : ${error?.message || "Veuillez réessayer."}`);
        }
    };
    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === "ios" ? "padding" : undefined}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
                    <Logo source={BASIC_LOGO.source} size={BASIC_LOGO.size} style={BASIC_LOGO.style} />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Prenom"
                        onChangeText={setFirstName}
                        value={firstName}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Nom de famille"
                        onChangeText={setLastName}
                        value={lastName}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Date de naissance"
                        onChangeText={setBirthDate}
                        value={birthDate}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Lieu de naissance"
                        onChangeText={setBirthPlace}
                        value={birthPlace}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Ville"
                        onChangeText={setCity}
                        value={city}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Commune"
                        onChangeText={setTown}
                        value={town}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Quartier"
                        onChangeText={setNeighborhood}
                        value={neighborhood}
                        secureTextEntry={false}
                    />

                    <Picker
                        selectedValue={sex}
                        onValueChange={(itemValue) => setSex(itemValue)}
                        style={BASIC_PICKER.pickerContainer}
                        itemStyle={BASIC_PICKER.picker}
                    >
                        <Picker.Item label="Sexe" value="default" />
                        <Picker.Item label="Homme" value="homme" />
                        <Picker.Item label="Femme" value="femme" />
                        <Picker.Item label="Autre" value="autre" />
                    </Picker>

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Profession"
                        onChangeText={setJob}
                        value={job}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Numero de telephone"
                        onChangeText={setPhone}
                        value={phone}
                        secureTextEntry={false}
                    />

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Mail"
                        onChangeText={setEmail}
                        value={email}
                        secureTextEntry={false}
                    />

                    <Picker
                        selectedValue={type}
                        onValueChange={(itemValue) => setType(itemValue)}
                        style={BASIC_PICKER.pickerContainer}
                        itemStyle={BASIC_PICKER.picker}
                    >
                        <Picker.Item label="Type d'utilisateur" value="default" />
                        <Picker.Item label="Usager" value="usager" />
                        <Picker.Item label="Professionnel" value="professionnel" />
                    </Picker>

                    <InputField
                        containerStyle={BASIC_INPUT_FIELD.containerStyle}
                        textStyle={BASIC_INPUT_FIELD.textStyle}
                        placeholder="Mot de passe"
                        onChangeText={setPassword}
                        value={password}
                        secureTextEntry={false}
                    />

                    <CustomButton
                        pressFunction={handleCreateAccountPress}
                        title={"Creer votre compte"}
                        style={BASIC_CUSTOM_BUTTON.basicCustomButton}
                        textStyle={BASIC_CUSTOM_BUTTON_TEXT.basicCustomButtonText}
                    />
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
    },
});
