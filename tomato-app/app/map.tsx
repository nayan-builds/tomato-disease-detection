import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { loadGPSData, saveGPSData } from "@/data/disease-locations";
import type { GPSLocation } from "@/data/disease-locations";
import * as Notifications from "expo-notifications";

interface NotificationData {
  detections: NotificationDetection[];
}
interface NotificationDetection {
  class: string;
  gps: GPSCoordinates;
  timestamp: string;
}
interface GPSCoordinates {
  lat: number;
  lng: number;
}

const mapNotificationToGPSData = (notificationData: NotificationData) => {
  return notificationData.detections.map((detection: NotificationDetection) => {
    const { lat, lng } = detection.gps;
    const { class: name } = detection;

    // Create a description based on the class
    let description = `Possible ${name} Detected`;

    return {
      latitude: lat,
      longitude: lng,
      name: name,
      description: description,
    };
  });
};

const MapScreen: React.FC = () => {
  const [locations, setLocations] = useState<GPSLocation[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await loadGPSData();
        setLocations(data);
      } catch (error) {
        console.error("Error loading GPS data:", error);
        setLocations([]); // Set to empty array in case of error
      }
    };
    loadData();

    // Handle notification when app is opened
    const checkForNotificationsOnStart = async () => {
      const response = await Notifications.getLastNotificationResponseAsync();
      if (response) {
        const data: NotificationData = response.notification.request.content
          .data as NotificationData;
        if (data && data.detections) {
          const newLocations = mapNotificationToGPSData(data);

          setLocations(newLocations);

          // Save the new data to the file
          saveGPSData(newLocations);
        }
      }
    };

    // Run when the map screen is opened
    checkForNotificationsOnStart();

    // Notification listener for handling incoming notifications
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        const data: NotificationData = notification.request.content
          .data as NotificationData;
        if (data && data.detections) {
          const newLocations = mapNotificationToGPSData(data);

          setLocations(newLocations);

          // Save the new data to the file
          saveGPSData(newLocations);
        }
      }
    );

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
    };
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapType="satellite"
        initialRegion={{
          latitude: locations[0]?.latitude || 50.66085989576423,
          longitude: locations[0]?.longitude || -1.2249142663715469,
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
