import { Slot } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

export default function ProfileLayout() {
  return (
    <View style={{ backgroundColor: 'red', flex: 1 }}>
      {/* Header */}
      <Slot />;{/* Footer */}
    </View>
  );
}
