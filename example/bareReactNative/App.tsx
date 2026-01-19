import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import {
  ToastContainer,
  Toast,
  ToastAnimationType,
} from 'react-native-toast-message-ts';
import * as ToastLib from 'react-native-toast-message-ts';

export default function App() {
  const [animation, setAnimation] = useState<ToastAnimationType>('slide-fade');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Toast Message TS</Text>
        <Text style={styles.subtitle}>Full Feature Test Suite</Text>

        {/* Basic Toasts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Toasts</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.successButton]}
              onPress={() => Toast.success('Success!', 'Operation completed')}
            >
              <Text style={styles.buttonText}>Success</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.errorButton]}
              onPress={() => Toast.error('Error!', 'Something went wrong')}
            >
              <Text style={styles.buttonText}>Error</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.warningButton]}
              onPress={() => Toast.warning('Warning!', 'Check your input')}
            >
              <Text style={styles.buttonText}>Warning</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.infoButton]}
              onPress={() => Toast.info('Info', 'Helpful information')}
            >
              <Text style={styles.buttonText}>Info</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Stack Testing - Critical for "Close All" */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>🥞 Stack & Close All</Text>
          <Text style={styles.sectionDescription}>
            Trigger multiple toasts, then tap the stack to expand. Verify "Close
            All" button appears.
          </Text>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() => {
              Toast.success(
                '1. First Notification',
                'I am at the bottom of the stack',
              );
              setTimeout(
                () =>
                  Toast.info('2. Second Notification', 'I am in the middle'),
                300,
              );
              setTimeout(
                () =>
                  Toast.warning(
                    '3. Third Notification',
                    'I am on top! Tap to expand!',
                  ),
                600,
              );
            }}
          >
            <Text style={styles.buttonText}>Show Stack (3 Toasts)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton, { marginTop: 10 }]}
            onPress={() => {
              Toast.success('Step 1', 'Processing...');
              setTimeout(() => Toast.info('Step 2', 'Uploading...'), 400);
              setTimeout(() => Toast.warning('Step 3', 'Verifying...'), 800);
              setTimeout(() => Toast.error('Step 4', 'Almost there...'), 1200);
              setTimeout(
                () => Toast.success('Step 5', 'Done! Expand me!'),
                1600,
              );
            }}
          >
            <Text style={styles.buttonText}>Show Deep Stack (5 Toasts)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton, { marginTop: 10 }]}
            onPress={() => {
              for (let i = 0; i < 5; i++) {
                setTimeout(() => {
                  Toast.success(
                    `Rapid Toast ${i + 1}`,
                    'Testing stack animation',
                  );
                }, i * 50); // 50ms delay is "quick motion"
              }
            }}
          >
            <Text style={styles.buttonText}>Rapid Fire (5 Toasts)</Text>
          </TouchableOpacity>
        </View>

        {/* Positions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Positions</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() =>
                Toast.info('Top Position', 'Appears at top', {
                  position: 'top',
                })
              }
            >
              <Text style={styles.buttonText}>Top</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() =>
                Toast.info('Bottom Position', 'Appears at bottom', {
                  position: 'bottom',
                })
              }
            >
              <Text style={styles.buttonText}>Bottom</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Durations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Durations</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() =>
                Toast.info('Quick', '2 seconds', { visibilityTime: 2000 })
              }
            >
              <Text style={styles.buttonText}>2s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() =>
                Toast.info('Long', '10 seconds', { visibilityTime: 10000 })
              }
            >
              <Text style={styles.buttonText}>10s</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.secondaryButton]}
              onPress={() =>
                Toast.info('Persistent', 'Tap X to close', { autoHide: false })
              }
            >
              <Text style={styles.buttonText}>Manual</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          style={[styles.button, styles.dangerButton, { marginTop: 10 }]}
          onPress={() => Toast.hide()}
        >
          <Text style={styles.buttonText}>Dismiss Current</Text>
        </TouchableOpacity>
      </ScrollView>

      <ToastContainer
        topOffset={60}
        bottomOffset={60}
        position="top"
        animation={animation}
        maxVisibleToasts={3}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7', // iOS grays
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 100,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 20,
    color: '#000',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#8E8E93',
    fontWeight: '500',
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 12,
    color: '#000',
  },
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
    lineHeight: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: '600',
  },
  successButton: { backgroundColor: '#34C759' },
  errorButton: { backgroundColor: '#FF3B30' },
  warningButton: { backgroundColor: '#FFCC00' },
  infoButton: { backgroundColor: '#007AFF' },
  primaryButton: { backgroundColor: '#5856D6' },
  secondaryButton: { backgroundColor: '#8E8E93' },
  dangerButton: { backgroundColor: '#FF3B30', marginTop: 10 },
});
