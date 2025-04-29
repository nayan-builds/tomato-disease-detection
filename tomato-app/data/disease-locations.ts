import * as FileSystem from "expo-file-system";

const fileUri = FileSystem.documentDirectory + "gps-data.json";

interface GPSLocation {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

// Function to save JSON
const saveGPSData = async (data: GPSLocation[] = []) => {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(data));
    console.log("File saved successfully at:", fileUri);
  } catch (error) {
    console.error("Error saving file:", error);
  }
};

// Function to load JSON
const loadGPSData = async () => {
      try {
        const fileUri = FileSystem.documentDirectory + "gps-data.json";
        const content = await FileSystem.readAsStringAsync(fileUri);
        const data: GPSLocation[] = JSON.parse(content);
        return data;
      } catch (error) {
        console.error("Error loading GPS data:", error);
        return []; // Return an empty array in case of error
      }
    };

export {saveGPSData, loadGPSData, fileUri};
export type { GPSLocation };
