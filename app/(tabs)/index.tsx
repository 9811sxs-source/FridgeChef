import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [photo, setPhoto] = useState<string | null>(null);

  async function takePhoto() {
    const permission = await ImagePicker.requestCameraPermissionsAsync();
    if (!permission.granted) {
      alert('Camera access is required to take a photo of your fridge.');
      return;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  async function pickFromGallery() {
    const result = await ImagePicker.launchImageLibraryAsync({
      quality: 0.7,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FridgeChef</Text>
      <Text style={styles.subtitle}>Take a photo of your fridge to get recipe ideas</Text>

      {photo ? (
        <View style={styles.previewContainer}>
          <Image source={{ uri: photo }} style={styles.preview} />
          <TouchableOpacity style={styles.buttonPrimary} onPress={() => setPhoto(null)}>
            <Text style={styles.buttonText}>Retake Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonPrimary, styles.buttonGreen]}>
            <Text style={styles.buttonText}>Find Recipes →</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.buttonPrimary} onPress={takePhoto}>
            <Text style={styles.buttonText}>📷  Take Photo</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttonPrimary, styles.buttonSecondary]} onPress={pickFromGallery}>
            <Text style={[styles.buttonText, styles.buttonTextDark]}>🖼  Choose from Gallery</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f7',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 40,
  },
  buttonGroup: {
    width: '100%',
    gap: 12,
  },
  buttonPrimary: {
    backgroundColor: '#2d6a4f',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonSecondary: {
    backgroundColor: '#e8e8e4',
  },
  buttonGreen: {
    backgroundColor: '#40916c',
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  buttonTextDark: {
    color: '#1a1a1a',
  },
  previewContainer: {
    width: '100%',
    alignItems: 'center',
  },
  preview: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    marginBottom: 20,
  },
});
