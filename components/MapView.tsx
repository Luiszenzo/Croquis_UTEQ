import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import MapViewDirections from 'react-native-maps-directions';

export default function MapViewComponent() {
  const [initialRegion, setInitialRegion] = useState<null | {
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  }>(null);

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [destination, setDestination] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);

  // Función para manejar el toque en el mapa y establecer destino
  const handleMapPress = (e: any) => {
    const { coordinate } = e.nativeEvent;
    setDestination({
      latitude: coordinate.latitude,
      longitude: coordinate.longitude
    });
  };

  useEffect(() => {
    (async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg('Permiso de ubicación denegado');
          return;
        }

        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        setLocation(currentLocation);
        setInitialRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        });
      } catch (error) {
        setErrorMsg('Error al obtener la ubicación');
      }
    })();
  }, []);

  const GOOGLE_MAPS_APIKEY = 'TU_API_KEY'; // Necesitarás una clave de API de Google Maps

  return (
    <View style={styles.container}>
      {errorMsg ? (
        <ThemedView style={styles.errorContainer}>
          <ThemedText>{errorMsg}</ThemedText>
        </ThemedView>
      ) : initialRegion ? (
        <MapView
          style={styles.map}
          initialRegion={initialRegion}
          showsUserLocation={true}
          showsMyLocationButton={true}
          onPress={handleMapPress}
        >
          {location && destination && (
            <MapViewDirections
              origin={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
              }}
              destination={destination}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          )}
          {location && (
            <Marker
              coordinate={{
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              }}
              title="Tu ubicación"
              description={`Precisión: ${location.coords.accuracy?.toFixed(0) ?? 'N/A'} metros`}
            />
          )}
          {destination && (
            <Marker
              coordinate={destination}
              title="Destino"
              pinColor="blue"
            />
          )}
        </MapView>
      ) : (
        <ThemedView style={styles.errorContainer}>
          <ThemedText>Cargando ubicación...</ThemedText>
        </ThemedView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
});
