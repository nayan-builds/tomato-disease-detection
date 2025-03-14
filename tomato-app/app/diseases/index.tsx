import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { diseases } from "@/data/diseases";

export default function DiseasesScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 10 }}>
        Tomato Diseases
      </Text>
      <FlatList
        data={diseases}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => router.push(`/diseases/${item.id}`)}>
            <Text style={{ fontSize: 18, padding: 10, borderBottomWidth: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
