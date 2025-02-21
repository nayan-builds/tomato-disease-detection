import { View, Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { getDiseaseById } from "@/data/diseases";

export default function DiseaseDetailScreen() {
  const { id } = useLocalSearchParams();
  const disease = getDiseaseById(id as string);

  if (!disease) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>
          Disease Not Found
        </Text>
        <Text style={{ fontSize: 16, marginTop: 10 }}>
          Please select a valid disease.
        </Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold" }}>{disease.name}</Text>
      <Text style={{ fontSize: 16, marginTop: 10 }}>{disease.description}</Text>
    </View>
  );
}
