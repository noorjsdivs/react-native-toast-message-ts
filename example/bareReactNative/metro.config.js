const { getDefaultConfig, mergeConfig } = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */

const path = require('path');

const root = path.resolve(__dirname, '../..');
const watchFolders = [root];

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  watchFolders,
  resolver: {
    blockList: [
      // Prevent Metro from seeing the root node_modules
      new RegExp(
        `${path.resolve(root, 'node_modules').replace(/\//g, '\\/')}\\/.*`,
      ),
    ],
    nodeModulesPaths: [path.resolve(__dirname, 'node_modules')],
    extraNodeModules: {
      react: path.resolve(__dirname, 'node_modules/react'),
      'react-native': path.resolve(__dirname, 'node_modules/react-native'),
      'react-native-toast-message-ts': path.resolve(root, 'lib/index.js'),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
