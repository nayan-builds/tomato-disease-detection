import * as FileSystem from "expo-file-system";

const fileUri = FileSystem.documentDirectory + "gps-data.json";

// Sample GPS data
const sampleData = [
  { latitude: 50.66324925099582, longitude: -1.2250455485299183, name: "Early Blight", description: "Possible Early Blight Detected" },
  { latitude: 50.662751769516575, longitude: -1.2263564551031554, name: "Septoria", description: "Possible Septoria Detected" }
];

interface GPSLocation {
  latitude: number;
  longitude: number;
  name: string;
  description: string;
}

// Function to save JSON
const saveGPSData = async () => {
  try {
    await FileSystem.writeAsStringAsync(fileUri, JSON.stringify(sampleData));
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
