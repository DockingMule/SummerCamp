import { Platform, StyleSheet } from 'react-native';

export default function Map() {
  const latitude = 39.84980594477792;
  const longitude = -75.10543198038818;
  const zoom = 15; // Adjust this: 1 (world) to 20 (buildings)

  // Only import MapView on native platforms
  if (Platform.OS === 'web') {
    return (
      <iframe
        style={styles.map as any}
        src={`https://maps.google.com/maps?q=${latitude},${longitude}&hl=en&z=${zoom}&output=embed`}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    );
  }

  // Dynamic import for native platforms
  const MapView = require('react-native-maps').default;

  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    />
  );
}

const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
});
