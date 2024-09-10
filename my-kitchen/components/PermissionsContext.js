import React, { createContext, useState, useContext, useEffect } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { Platform, Alert } from 'react-native';

const PermissionsContext = createContext();

export function usePermissions() {
  return useContext(PermissionsContext);
}

export const PermissionsProvider = ({ children }) => {
  const [hasGalleryPermission, setHasGalleryPermission] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        setHasGalleryPermission(status === 'granted');
        if (status !== 'granted') {
          Alert.alert('Permission Required', 'We need camera roll permissions to access your photos!');
        }
      }
    })();
  }, []);

  return (
    <PermissionsContext.Provider value={hasGalleryPermission}>
      {children}
    </PermissionsContext.Provider>
  );
};
