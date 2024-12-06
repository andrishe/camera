import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'expo-router';
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  CameraCapturedPicture,
} from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back');
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);
  const [picture, setPicture] = useState<CameraCapturedPicture>();

  useEffect(() => {
    if (permission && !permission?.granted && permission.canAskAgain) {
      requestPermission();
    }
  }, [permission]);

  if (!permission?.granted) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  const takePicture = async () => {
    const res = await cameraRef.current?.takePictureAsync();
    setPicture(res);
  };

  if (picture) {
    return (
      <View>
        <Image
          source={{ uri: picture.uri }}
          style={{ height: '100%', width: '100%' }}
        />
        <MaterialIcons
          onPress={() => {
            setPicture(undefined);
          }}
          name="close"
          size={35}
          color="white"
          style={{ position: 'absolute', top: 50, left: 20 }}
        />
      </View>
    );
  }

  return (
    <View>
      <CameraView ref={cameraRef} style={styles.camera} facing={facing}>
        <View style={styles.footer}>
          <Pressable style={styles.recordButton} onPress={takePicture} />
          <MaterialIcons
            name="flip-camera-ios"
            size={50}
            color="white"
            onPress={toggleCameraFacing}
          />
        </View>
      </CameraView>
      <MaterialIcons
        name="close"
        size={30}
        color="white"
        style={styles.close}
        onPress={() => router.back()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  camera: {
    width: '100%',
    height: '100%',
  },
  close: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  footer: {
    marginTop: 'auto',
    padding: 20,
    paddingBottom: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#00000099',
  },
  recordButton: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: 'white',
  },
});
