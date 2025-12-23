import { Platform, StyleSheet } from 'react-native';

export default function Map() {
  // Extracted from Google Maps embed URL
  const latitude = 39.849365711258024;
  const longitude = -75.10678544412546;

  // Only import MapView on native platforms
  if (Platform.OS === 'web') {
    return (
      <iframe
        style={styles.map as any}
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1325.6169897731074!2d-75.10678544412546!3d39.849365711258024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ce350ce638bf%3A0xf91346f84eada73b!2sDeptford%20Sports%20Complex!5e0!3m2!1sen!2sus!4v1766526093199!5m2!1sen!2sus"
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
