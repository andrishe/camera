import {
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { Link, useFocusEffect } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import { MediaType, getMediaType } from '../../media';
import { Video, ResizeMode } from 'expo-av';

type Media = {
  name: string;
  uri: string;
  type: MediaType;
};

const isImageFile = (fileName: string) => {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif'];
  return imageExtensions.some((ext) => fileName.toLowerCase().endsWith(ext));
};

export default function HomeScreen() {
  const [images, setImages] = useState<Media[]>([]);

  const loadFiles = async () => {
    if (!FileSystem.documentDirectory) {
      return;
    }

    const res = await FileSystem.readDirectoryAsync(
      FileSystem.documentDirectory
    );
    const imageFiles = res.filter(isImageFile);
    setImages(
      imageFiles.map((file) => ({
        name: file,
        uri: FileSystem.documentDirectory + file,
        type: getMediaType(file),
      }))
    );
  };

  console.log(JSON.stringify(images, null, 2));

  useFocusEffect(
    useCallback(() => {
      loadFiles();
    }, [])
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={images}
        numColumns={3}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        keyExtractor={(item) => item.uri}
        renderItem={({ item }) => (
          <Link href={`/${item.name}`} asChild>
            <Pressable style={{ flex: 1, maxWidth: '33.33%' }}>
              {item.type === 'image' && (
                <Image
                  source={{ uri: item.uri }}
                  style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
                />
              )}
              {item.type === 'video' && (
                <>
                  <Video
                    source={{ uri: item.uri }}
                    style={{ aspectRatio: 3 / 4, borderRadius: 5 }}
                    resizeMode={ResizeMode.COVER}
                    positionMillis={100}
                    shouldPlay
                    isLooping
                  />
                  <MaterialIcons
                    name="play-circle-outline"
                    style={{ position: 'absolute' }}
                    size={30}
                    color="white"
                  />
                </>
              )}
            </Pressable>
          </Link>
        )}
      />

      <Link href="/Camera" asChild>
        <Pressable style={styles.floatingButton}>
          <MaterialIcons name="photo-camera" size={30} color="white" />
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  floatingButton: {
    backgroundColor: 'royalblue',
    padding: 15,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    right: 20,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
