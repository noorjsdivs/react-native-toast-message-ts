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
import { ToastContainer, Toast, ToastAnimationType } from 'react-native-toast-message-ts';

export default function App() {
  const [animation, setAnimation] = useState<ToastAnimationType>('slide-fade');

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
                visibilityTime: 2000,
              })
            }
          >
            <Text style={styles.buttonText}>Quick (2s)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.info('Long Toast', 'This stays for 10 seconds', {
                visibilityTime: 10000,
              })
            }
          >
            <Text style={styles.buttonText}>Long (10s)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.primaryButton]}
            onPress={() =>
              Toast.info('Persistent Toast', 'Tap "Hide" or the X button to dismiss', {
                autoHide: false,
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
          <Text style={styles.sectionTitle}>🆕 Drawer-Style Stacking</Text>

          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={() => {
              Toast.success('First Toast', 'This will be dismissed');
              setTimeout(() => Toast.info('Second Toast', 'This appears next'), 500);
              setTimeout(() => Toast.warning('Third Toast', 'Now this is showing!'), 1000);
            }}
          >
            <Text style={styles.buttonText}>Show Multiple Toasts (Queue)</Text>
          </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.primaryButton]}
              onPress={() => {
                Toast.success('Step 1', 'First task done');
                setTimeout(() => Toast.info('Step 2', 'Processing...'), 400);
                setTimeout(() => Toast.warning('Step 3', 'Almost done...'), 800);
                setTimeout(() => Toast.success('Step 4', 'All done! Tap stack to expand!'), 1200);
              }}
            >
              <Text style={styles.buttonText}>Sequential Steps (Tap Stack to Expand)</Text>
            </TouchableOpacity>
          </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>� Animation Types</Text>
          <Text style={styles.sectionDescription}>
            Current animation: <Text style={styles.highlight}>{animation}</Text>
          </Text>

          <View style={styles.animationPicker}>
            <TouchableOpacity
              style={[
                styles.animationButton,
                animation === 'slide-fade' && styles.animationButtonActive,
              ]}
              onPress={() => setAnimation('slide-fade')}
            >
              <Text
                style={[
                  styles.animationButtonText,
                  animation === 'slide-fade' && styles.animationButtonTextActive,
                ]}
              >
                Slide + Fade
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.animationButton,
                animation === 'slide' && styles.animationButtonActive,
              ]}
              onPress={() => setAnimation('slide')}
            >
              <Text
                style={[
                  styles.animationButtonText,
                  animation === 'slide' && styles.animationButtonTextActive,
                ]}
              >
                Slide Only
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.animationButton, animation === 'fade' && styles.animationButtonActive]}
              onPress={() => setAnimation('fade')}
            >
              <Text
                style={[
                  styles.animationButtonText,
                  animation === 'fade' && styles.animationButtonTextActive,
                ]}
              >
                Fade Only
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={() =>
              Toast.success('Animation Test', `Using "${animation}" animation`, { position: 'top' })
            }
          >
            <Text style={styles.buttonText}>Test at Top</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={() =>
              Toast.info('Animation Test', `Using "${animation}" animation`, { position: 'bottom' })
            }
          >
            <Text style={styles.buttonText}>Test at Bottom</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>�🎭 Icon Configuration</Text>

          <TouchableOpacity
            style={[styles.button, styles.successButton]}
            onPress={() =>
              Toast.success('No Icons', 'Just text, clean design', {
                iconConfig: {
                  hideLeadingIcon: true,
                  hideCloseIcon: true,
                },
              })
            }
          >
            <Text style={styles.buttonText}>No Icons (Text Only)</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.errorButton]}
            onPress={() =>
              Toast.error('No Close Button', 'Has icon but no close button', {
                iconConfig: {
                  hideCloseIcon: true,
                },
              })
            }
          >
            <Text style={styles.buttonText}>No Close Button</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.infoButton]}
            onPress={() =>
              Toast.info('No Leading Icon', 'Has close button but no leading icon', {
                iconConfig: {
                  hideLeadingIcon: true,
                },
              })
            }
          >
            <Text style={styles.buttonText}>No Leading Icon</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.warningButton]}
            onPress={() =>
              Toast.warning('Custom Icon Size', 'Larger icon for emphasis', {
                iconConfig: {
                  leadingIconSize: 32,
                },
              })
            }
          >
            <Text style={styles.buttonText}>Larger Icon Size</Text>
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
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            🎨 Drawer-Style Stacking • 📱 Cross-Platform • ⚡ Smooth Animations
          </Text>
        </View>
      </ScrollView>

      <ToastContainer
        topOffset={50}
        bottomOffset={50}
        position="top"
        animation={animation}
        // Example of custom color overrides:
        // success={{ backgroundColor: 'blue', color: 'white' }}
        // warning={{ backgroundColor: '#cc8800', color: 'white' }}
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
  sectionDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 12,
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007bff',
  },
  animationPicker: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  animationButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#e9ecef',
    alignItems: 'center',
  },
  animationButtonActive: {
    backgroundColor: '#007bff',
  },
  animationButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#495057',
  },
  animationButtonTextActive: {
    color: '#ffffff',
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
