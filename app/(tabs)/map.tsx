import { StyleSheet } from 'react-native';
import MapView from '@/components/MapView';
import { ThemedView } from '@/components/ThemedView';

export default function MapScreen() {
  return (
    <ThemedView style={styles.container}>
      <MapView />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});