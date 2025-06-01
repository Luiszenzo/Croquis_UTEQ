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

  const [fixedLocations, setFixedLocations] = useState([
    {
      latitude: 20.6533474,
      longitude: -100.4046172,
      title: 'Entrada principa',
      description: 'Acceso 1'
    },
    {
      latitude: 20.6543228,
      longitude: -100.4046271,
      title: 'Edificio DTAI',
      description: 'División de Tecnologías de Automatización e Información'
    }
    ,{
      latitude: 20.6541214,
      longitude:  -100.4041198,
      title: 'Módulo Sanitario 1',
      description: ''
    },{
      latitude: 20.6543228,
      longitude: -100.4046271,
      title: 'Edificio DTAI',
      description: 'División de Tecnologías de Automatización e Información'
    },
    {
      latitude: 20.6543096,
      longitude: -100.4054418,
      title: 'Rectoría',
      description: 'Tramites institucionales'
    },
    {
      latitude:  20.6540485,
      longitude: -100.4060981,
      title: 'Vinculación escolar',
      description: 'Inscripciones, becas, etc.'
    },
    {
      latitude: 20.6549875,
      longitude: -100.4062969,
      title: 'Edificio De Medios',
      description: 'División Idiomas'
    },
    {
      latitude: 20.6544725,
      longitude: -100.4041274,
      title: 'División Industrial',
      description: 'Edificio F'
    },
    
    {
      latitude: 20.6549875,
      longitude: -100.4062969,
      title: 'División de tecnología ambiental',
      description: 'Edificio G'
    },
    {
      latitude: 20.6557433,
      longitude: -100.4048658,
      title: 'Edificio de Nanotecnología',
      description: 'Edificio H'
    },
    {
      latitude: 20.6560881,
      longitude: -100.4060255,
      title: 'Auditorio UTEQ',
    }
    // Puedes añadir más ubicaciones aquí
  ]);

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
          {fixedLocations.map((loc, index) => (
            <Marker
              key={index}
              coordinate={loc}
              title={loc.title}
              description={loc.description}
              pinColor="green"
            />
          ))}
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
