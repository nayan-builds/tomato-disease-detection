import { Image, StyleSheet, Platform, ScrollView } from "react-native";

import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useEffect } from "react";
import { saveGPSData } from "@/data/disease-locations";

export default function HomeScreen() {
  useEffect(() => {
    saveGPSData();
  }, []);
  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedText style={styles.titleText} type="title">
          Tomato-Scan
        </ThemedText>
        <ThemedText type="default">
          This is where you can view the map of the disease locations from the
          automatic disease identified from the "Map" tab.
        </ThemedText>
        <ThemedText type="default">
          You can also view suggestions for each disease from the "Diseases"
          tab.
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
});
