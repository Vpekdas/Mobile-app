const fs = require("fs");
const admin = require("firebase-admin");

const serviceAccount = require("./admin.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

const geoJsonPath = "./db.json";

// Normalize the string by making it lowercase and removing accents.
const normalizeString = (str) =>
    str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .trim();

const mapGeoJsonToFirestore = (geoJson) => {
    return geoJson.features
        .map((facility) => {
            const properties = facility.properties;
            const geometry = facility.geometry;

            const facilityName = properties.name || "Unknown";
            const normalizedFacilityName = normalizeString(facilityName);
            const specialty = properties["healthcare-speciality"] || null;
            const normalizedSpecialty = specialty ? normalizeString(specialty) : null;

            return {
                facility: facilityName, 
                facility_search: normalizedFacilityName,
                address: `${properties["addr-street"] || ""} ${properties["addr-city"] || ""} ${
                    properties["addr-postcode"] || ""
                }`,
                country: "France",
                city: properties["addr-city"] || "Unknown",
                postalCode: properties["addr-postcode"] || "Unknown",
                type: properties.amenity || "Unknown",
                sector: "Public",
                telephone: properties["contact-phone"] || properties.phone || "Not Provided",
                specialty: specialty ? [specialty] : [],
                specialty_search: normalizedSpecialty, 
                latitude: geometry ? geometry.coordinates[1] : null,
                longitude: geometry ? geometry.coordinates[0] : null,
                team: [],
                openingHours: properties["opening_hours"] || "Not Provided",
                logo: null,
                distance: 0,
            };
        })
        .filter((facility) => facility.facility !== "Unknown");
};

const uploadFacilitiesToFirestore = async (mappedFacilities) => {
    const facilitiesCollection = db.collection("establishments");

    try {
        for (let facility of mappedFacilities) {
            await facilitiesCollection.add(facility);
            console.log("Uploaded facility:", facility.facility);
        }
        console.log("All facilities uploaded successfully.");
    } catch (error) {
        console.error("Error uploading facilities:", error);
    }
};

fs.readFile(geoJsonPath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading GeoJSON file:", err);
        return;
    }

    const geoJson = JSON.parse(data);
    const mappedFacilities = mapGeoJsonToFirestore(geoJson);

    uploadFacilitiesToFirestore(mappedFacilities);
});
