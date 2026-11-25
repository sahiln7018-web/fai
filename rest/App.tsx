
import React, { useState } from 'react';

import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, ActivityIndicator, ScrollView,
} from 'react-native';

export default function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const getWeather = async () => {
    if (!city.trim()) {
      setError('Please enter a city name');
      setWeather(null);
      return;
    }

    setLoading(true);
    setError('');
    setWeather(null);

    try {
      const geo = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1&language=en&format=json`
      );

      const location = (await geo.json()).results?.[0];

      if (!geo.ok || !location) {
        throw new Error('City not found. Please enter a valid city.');
      }

      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.latitude}&longitude=${location.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,weather_code`
      );

      const data = await response.json();

      if (!response.ok || !data.current) {
        throw new Error('Unable to fetch weather data');
      }

      setWeather({
        city: location.name,
        country: location.country,
        temperature: data.current.temperature_2m,
        feelsLike: data.current.apparent_temperature,
        humidity: data.current.relative_humidity_2m,
        windSpeed: data.current.wind_speed_10m,
        condition: data.current.weather_code,
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Weather App</Text>
      <Text style={styles.subtitle}>Check Weather of Any City</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={city}
        onChangeText={setCity}
      />

      <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="blue" style={{ marginTop: 20 }} />}

      {!!error && <Text style={styles.error}>{error}</Text>}

      {weather && (
        <View style={styles.card}>
          <Text style={styles.city}>{weather.city}, {weather.country}</Text>
          <Text style={styles.temperature}>{weather.temperature} °C</Text>
          <Text style={styles.details}>Temperature</Text>
          <Text style={styles.details}>Feels Like: {weather.feelsLike} °C</Text>
          <Text style={styles.details}>Humidity: {weather.humidity} %</Text>
          <Text style={styles.details}>Wind Speed: {weather.windSpeed} km/h</Text>
          <Text style={styles.details}>Weather Code: {weather.condition}</Text>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1, justifyContent: 'center', alignItems: 'center',
    backgroundColor: '#e3f2fd', padding: 20,
  },
  heading: {
    fontSize: 32, fontWeight: 'bold', color: '#1565c0', marginBottom: 10,
  },
  subtitle: {
    fontSize: 17, color: '#444', marginBottom: 25,
  },
  input: {
    width: '100%', backgroundColor: 'white', borderWidth: 1,
    borderColor: '#1565c0', borderRadius: 8, padding: 14,
    fontSize: 16, marginBottom: 15,
  },
  button: {
    backgroundColor: '#1565c0', padding: 15, borderRadius: 8,
    width: '100%', alignItems: 'center',
  },
  buttonText: {
    color: 'white', fontSize: 18, fontWeight: 'bold',
  },
  card: {
    backgroundColor: 'white', padding: 25, width: '100%',
    borderRadius: 12, marginTop: 25, elevation: 4, alignItems: 'center',
  },
  city: {
    fontSize: 23, fontWeight: 'bold', color: '#1565c0', marginBottom: 15,
  },
  temperature: {
    fontSize: 42, fontWeight: 'bold', color: '#e65100',
  },
  details: {
    fontSize: 17, marginTop: 12, color: '#333',
  },
  error: {
    color: 'red', fontSize: 16, marginTop: 20, textAlign: 'center',
  },
});



//cd fai/rest
//npm install
//npx expo start 