import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
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
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.titleText} type="title">
          {disease.name}
        </ThemedText>
        <ThemedText type="subtitle">Description</ThemedText>
        <ThemedText type="default">{disease.description}</ThemedText>
        <ThemedText type="subtitle">Recommendations</ThemedText>
        <ThemedText type="default">{disease.recommendation}</ThemedText>
        <ThemedText type="defaultSemiBold" style={styles.noticeText}>
          Recommendation summary taken from{" "}
          <ThemedText
            type="default"
            style={styles.link}
            onPress={() => Linking.openURL(disease.source_url)}
          >
            {disease.source}
          </ThemedText>
          , please refer to the source or do your own research to find suitable
          recommendations for you.
        </ThemedText>
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 16,
    width: "100%",
    gap: 16,
  },
  titleText: {
    textAlign: "center",
    alignSelf: "center",
  },
  noticeText: {
    textAlign: "center",
    alignSelf: "center",
  },
  link: {
    color: "#0a7ea4",
    textDecorationLine: "underline",
    textDecorationColor: "#0a7ea4",
    textDecorationStyle: "solid",
  },
});
