import { Image } from 'expo-image';
import { StyleSheet } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import ParallaxScrollView from '@/components/ParallaxScrollView';

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/uteq-logo.jpeg')} // Reemplazar con el logo de la UTEQ
          style={styles.logo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Croquis UTEQ</ThemedText>
      </ThemedView>
      <ThemedView style={styles.descriptionContainer}>
        <ThemedText>
          Un mapa de la universidad diseñado para alumnos, profesores y visitantes
        </ThemedText>
      </ThemedView>
      
      {/* Sección de características */}
      <ThemedView style={styles.featureContainer}>
        <ThemedText type="subtitle">Características:</ThemedText>
        <ThemedText>- Navegación intuitiva</ThemedText>
        <ThemedText>- Información de edificios</ThemedText>
        <ThemedText>- Rutas accesibles</ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: 'center',
    marginVertical: 20,
    backgroundColor: 'rgba(0, 82, 147, 0.8)', // Azul UTEQ
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  descriptionContainer: {
    marginBottom: 30,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(2, 1, 1, 0.9)',
    borderRadius: 8,
    padding: 12,
    borderLeftWidth: 5,
    borderLeftColor: '#005293', // Azul UTEQ
  },
  featureContainer: {
    gap: 8,
    marginBottom: 8,
    paddingHorizontal: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    borderRadius: 8,
    padding: 15,
    borderLeftWidth: 3,
    borderLeftColor: '#005293', // Azul UTEQ
  },
  logo: {
    height: 150,
    width: 150,
    alignSelf: 'center',
    marginTop: 20,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  titleText: {
    color: '#fff', // Texto blanco para contraste
    fontSize: 24,
    fontWeight: 'bold',
  },
  subtitleText: {
    color: '#005293', // Azul UTEQ
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
});

// Modifica el componente ThemedText para usar estos estilos:
<>
  <ThemedText type="title" style={styles.titleText}>Croquis UTEQ</ThemedText>
  <ThemedText type="subtitle" style={styles.subtitleText}>Características:</ThemedText>
</>
