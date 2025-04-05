import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { loadGPSData } from "@/data/disease-locations";
import type { GPSLocation } from "@/data/disease-locations";

const MapScreen: React.FC = () => {
  const [locations, setLocations] = useState<GPSLocation[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadGPSData();
        setLocations(data);
      } catch (error) {
        console.error("Error loading GPS data:", error);
      }
    };
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
        initialRegion={{
          latitude: locations[0]?.latitude || 37.7749,
          longitude: locations[0]?.longitude || -122.4194,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: loc.latitude, longitude: loc.longitude }}
            title={loc.name}
            description={loc.description}
          />
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default MapScreen;
