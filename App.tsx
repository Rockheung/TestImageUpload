/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {forwardRef} from 'react';
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
  Platform,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

const Header = forwardRef((props, ref) => {
  const handleCamera = React.useCallback(() => {
    ImagePicker.openCamera({
      multiple: true,
      forceJPG: true,
    })
      .then(images => {
        const _images = images.map(image => {
          return Platform.OS === 'ios'
            ? {...image, path: image.sourceURL}
            : image;
        });
        props.setImages(_images);
      })
      .catch(console.warn);
  }, [props]);

  const handleLibrary = React.useCallback(() => {
    ImagePicker.openPicker({
      multiple: true,
      forceJPG: true,
    })
      .then(images => {
        const _images = images.map(image => {
          return Platform.OS === 'ios'
            ? {...image, path: image.sourceURL}
            : image;
        });
        props.setImages(_images);
      })
      .catch(console.warn);
  }, [props]);

  return (
    <View ref={ref} style={styles.header}>
      <TouchableOpacity style={styles.button} onPress={handleCamera}>
        <Text>{'촬영'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleLibrary}>
        <Text>{'앨범'}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={props.sendImages}>
        <Text>{'전송'}</Text>
      </TouchableOpacity>
    </View>
  );
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [images, setImages] = React.useState<any[]>([null]);

  const handleImages = React.useCallback(newImages => {
    setImages(prevImages => {
      return [null, ...prevImages, ...newImages];
    });
  }, []);

  const handleSubmit = React.useCallback(async () => {
    const _form = new FormData();
    images.map((image, idx) => {
      _form.append('image_' + idx, {
        type: image.mime,
        name: 'image_' + idx,
        uri: image.path,
      });
    });
    const res = await fetch('http://localhost:8080', {
      method: 'POST',
      body: _form,
    });
    console.log(res);
  }, [images]);

  React.useEffect(() => {
    console.log(
      '🚀 ~ file: App.tsx ~ line 73 ~ App ~ images',
      JSON.stringify(images, null, 2),
    );
  }, [images]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        style={styles.wrapper}
        stickyHeaderHiddenOnScroll={false}
        StickyHeaderComponent={forwardRef((props, ref) => (
          <Header
            ref={ref}
            setImages={handleImages}
            sendImages={handleSubmit}
          />
        ))}
        stickyHeaderIndices={[0]}
        contentContainerStyle={styles.contentContainer}>
        {images.slice(1).length ? (
          images.slice(1).map((image, idx) => {
            const width = Math.floor(Dimensions.get('screen').width / 2);
            const height = (width * image.height) / image.width;
            return (
              <Image
                style={{width, height}}
                key={image.path + '/' + idx}
                source={{uri: image.path}}
                resizeMode={'contain'}
              />
            );
          })
        ) : (
          <Text>{'No Image Found'}</Text>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    backgroundColor: 'lightyellow',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    zIndex: 99,
  },
  button: {
    flexBasis: '20%',
    backgroundColor: 'lightblue',
    padding: 24,
    margin: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  contentContainer: {
    // flex: 1,
    backgroundColor: 'pink',
  },
});

export default App;
