import { FontAwesome5 } from "@expo/vector-icons";
import { Image, ImageSourcePropType, ImageStyle, Text, TextStyle, View, ViewStyle } from "react-native";

export interface ResultProps {
    logo?: ImageSourcePropType;
    facility: string;
    specialist: string;
    address: string;
    distance: string;
}

const DEFAULT_CONTAINER_STYLE: ViewStyle = {
    width: "80%",
    borderWidth: 1,
    borderColor: "#64B6AC",
    flexDirection: "row",
    borderRadius: 12,
    padding: 15,
    backgroundColor: "#DAFFEF",
    alignSelf: "center",
    alignItems: "center",
};

const DEFAULT_NAME_STYLE: TextStyle = {
    color: "#5D737E",
    fontSize: 16,
    fontWeight: "bold",
};

const DEFAULT_DETAIL_STYLE: TextStyle = {
    color: "#64B6AC",
    fontSize: 14,
};

const DEFAULT_LOGO_STYLE: ImageStyle = {
    width: 64,
    height: 64,
    borderRadius: 20,
    marginRight: 15,
};

const DEFAULT_RESULT_CONTAINER_STYLE: ViewStyle = {
    flex: 1,
    justifyContent: "space-evenly",
    paddingVertical: 10,
};

const DEFAULT_DISTANCE_CONTAINER_STYLE: ViewStyle = {
    flex: 1,
    flexDirection: "row",
};

export default function Result(props: ResultProps) {
    return (
        <View style={DEFAULT_CONTAINER_STYLE}>
            <Image source={props.logo} style={DEFAULT_LOGO_STYLE} resizeMode="cover" />
            <View style={DEFAULT_RESULT_CONTAINER_STYLE}>
                <Text style={DEFAULT_NAME_STYLE}>{props.facility}</Text>
                <Text style={DEFAULT_DETAIL_STYLE}>{props.specialist}</Text>
                <Text style={DEFAULT_DETAIL_STYLE}>{props.address}</Text>
                <View style={DEFAULT_DISTANCE_CONTAINER_STYLE}>
                    <FontAwesome5 name="map-marker-alt" size={20} color="#64B6AC" style={{ marginRight: 8 }} />
                    <Text style={DEFAULT_DETAIL_STYLE}>{props.distance}</Text>
                </View>
            </View>
        </View>
    );
}
