import { getAuth, onIdTokenChanged } from "firebase/auth";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import React, { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { User } from "../types/user";

interface UserContextData {
    userData: User | null;
    profileImage: string | null;
    loading: boolean;
    error: string | null;
    emailVerified: boolean;
    refreshUser?: () => Promise<void>;
}

const UserContext = createContext<UserContextData>({
    userData: null,
    profileImage: null,
    loading: true,
    error: null,
    emailVerified: false,
});

interface UserProviderProps {
    children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
    const [userData, setUserData] = useState<User | null>(null);
    const [profileImage, setProfileImage] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [emailVerified, setEmailVerified] = useState<boolean>(false);

    useEffect(() => {
        const auth = getAuth();
        const firestore = getFirestore();
        const storage = getStorage();

        const unsubscribe = onIdTokenChanged(auth, async (user) => {
            setLoading(true);
            setError(null);

            if (user) {
                setEmailVerified(user.emailVerified);

                try {
                    const docRef = doc(firestore, "users", user.uid);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const data = docSnap.data() as User;
                        setUserData(data);
                    } else {
                        setUserData(null);
                        setError(`User data not found for UID: ${user.uid}`);
                    }

                    const imageRef = ref(storage, `profileImages/${user.uid}/profile.jpg`);
                    try {
                        const url = await getDownloadURL(imageRef);
                        setProfileImage(url);
                    } catch (err) {
                        setProfileImage(null);
                    }
                } catch (err) {
                    setError("Failed to fetch user data.");
                    setUserData(null);
                    setProfileImage(null);
                }
            } else {
                setUserData(null);
                setProfileImage(null);
                setEmailVerified(false);
            }

            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const refreshUser = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) return;
            await user.reload();
            await user.getIdToken(true);
        } catch (err) {}
    };

    return (
        <UserContext.Provider value={{ userData, profileImage, loading, error, emailVerified, refreshUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => useContext(UserContext);
