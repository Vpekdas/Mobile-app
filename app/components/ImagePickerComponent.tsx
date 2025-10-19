import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ImageResizer from "react-native-image-resizer";

interface ImagePickerComponentProps {
    selectedImage: string | null;
    onImageSelected: (imageUri: string) => void;
    onImageError: (error: any) => void;
}

export default function ImagePickerComponent({ selectedImage, onImageSelected, onImageError }: ImagePickerComponentProps) {
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
        try {
            setIsLoading(true);
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (!result.canceled) {
                const imageUri = result.assets[0].uri;

                try {
                    const resizedImage = await ImageResizer.createResizedImage(imageUri, 800, 800, "JPEG", 80, 0);
                    onImageSelected(resizedImage.uri);
                } catch (resizeError) {
                    onImageError(resizeError);
                }
            }
        } catch (error) {
            onImageError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={pickImage} style={styles.imagePickerButton}>
                {isLoading ? (
                    <Text>Loading...</Text>
                ) : selectedImage ? (
                    <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
                ) : (
                    <Text style={styles.buttonText}>Select Profile Image</Text>
                )}
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        marginBottom: 20,
    },
    imagePickerButton: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: "#ccc",
        justifyContent: "center",
        alignItems: "center",
    },
    imagePreview: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },
    buttonText: {
        textAlign: "center",
        color: "#555",
    },
});

