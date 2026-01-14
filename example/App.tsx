import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { ToastContainer, Toast } from 'react-native-toast-message-ts';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>React Native Toast Message</Text>
        <Text style={styles.subtitle}>TypeScript Edition</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Basic Toasts</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={() => Toast.success('Success!', 'Operation completed successfully')}
          >
            <Text style={styles.buttonText}>Show Success Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={() => Toast.error('Error!', 'Something went wrong')}
          >
            <Text style={styles.buttonText}>Show Error Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={() => Toast.warning('Warning!', 'Please review your input')}
          >
            <Text style={styles.buttonText}>Show Warning Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={() => Toast.info('Info', 'Here is some helpful information')}
          >
            <Text style={styles.buttonText}>Show Info Toast</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Positions</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.success('Top Position', 'This toast appears at the top', {
                position: 'top',
              })
            }
          >
            <Text style={styles.buttonText}>Top Position</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.success('Bottom Position', 'This toast appears at the bottom', {
                position: 'bottom',
              })
            }
          >
            <Text style={styles.buttonText}>Bottom Position</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Durations</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.info('Quick Toast', 'This disappears in 2 seconds', {
                duration: 2000,
              })
            }
          >
            <Text style={styles.buttonText}>Quick (2s)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.info('Long Toast', 'This stays for 10 seconds', {
                duration: 10000,
              })
            }
          >
            <Text style={styles.buttonText}>Long (10s)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.info('Persistent Toast', 'Tap "Hide" to dismiss this', {
                duration: 0,
              })
            }
          >
            <Text style={styles.buttonText}>Persistent (Manual)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.dangerButton]}
            onPress={() => Toast.hide()}
          >
            <Text style={styles.buttonText}>Hide Toast</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Custom Styling</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.show({
                type: 'success',
                text1: 'Dark Theme',
                text2: 'Custom background and text colors',
                backgroundColor: '#1a1a1a',
                borderLeftColor: '#00ff00',
                text1Style: { color: '#ffffff', fontWeight: 'bold' },
                text2Style: { color: '#cccccc' },
              })
            }
          >
            <Text style={styles.buttonText}>Dark Theme Toast</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.show({
                type: 'info',
                text1: 'Custom Border',
                text2: 'With purple border color',
                borderLeftColor: '#9b59b6',
              })
            }
          >
            <Text style={styles.buttonText}>Purple Border</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Interactive</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.info('Tap Me!', 'This toast can be tapped', {
                onPress: () => console.log('Toast was pressed!'),
              })
            }
          >
            <Text style={styles.buttonText}>Toast with onPress</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.success('Not Swipeable', 'Try swiping this toast', {
                swipeable: false,
              })
            }
          >
            <Text style={styles.buttonText}>Non-Swipeable Toast</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Advanced</Text>
          
          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.show({
                type: 'custom',
                text1: 'Fully Custom Toast',
                text2: 'With all options configured',
                position: 'bottom',
                duration: 5000,
                backgroundColor: '#2c3e50',
                borderLeftColor: '#e74c3c',
                text1Style: {
                  color: '#ecf0f1',
                  fontSize: 18,
                  fontWeight: 'bold',
                },
                text2Style: {
                  color: '#bdc3c7',
                  fontSize: 14,
                },
                animationDuration: 500,
                onShow: () => console.log('Toast shown'),
                onHide: () => console.log('Toast hidden'),
              })
            }
          >
            <Text style={styles.buttonText}>Fully Configured Toast</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎨 Highly Customizable • 📱 Cross-Platform • ⚡ Performant
          </Text>
        </View>
      </ScrollView>

      <ToastContainer
        topOffset={50}
        bottomOffset={50}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: '#2c3e50',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#7f8c8d',
  },
  section: {
    marginBottom: 30,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#2c3e50',
  },
  button: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    alignItems: 'center',
  },
  successButton: {
    backgroundColor: '#28a745',
  },
  errorButton: {
    backgroundColor: '#dc3545',
  },
  warningButton: {
    backgroundColor: '#ffc107',
  },
  infoButton: {
    backgroundColor: '#17a2b8',
  },
  primaryButton: {
    backgroundColor: '#007bff',
  },
  dangerButton: {
    backgroundColor: '#dc3545',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  footer: {
    marginTop: 20,
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
});
