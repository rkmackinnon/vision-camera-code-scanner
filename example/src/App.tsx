import React from 'react';
import { useEffect, useState } from 'react';

import { StyleSheet, Text } from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from './Constants';

export default function App() {
  const [hasPermission, setHasPermission] = useState(false);
  const [types] = useState<Array<BarcodeFormat>>([
    BarcodeFormat.ALL_FORMATS,
    BarcodeFormat.QR_CODE,
    BarcodeFormat.CODE_128,
  ]);

  const [frameProcessor, barcodes] = useScanBarcodes(types);

  const [cameraPosition] = useState<'front' | 'back'>('back');

  const device = useCameraDevice(cameraPosition, {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });

  const [targetFps] = useState(30);

  const screenAspectRatio = SCREEN_HEIGHT / SCREEN_WIDTH;
  const format = useCameraFormat(device, [
    { fps: targetFps },
    { videoAspectRatio: screenAspectRatio },
    { videoResolution: 'max' },
    { photoAspectRatio: screenAspectRatio },
    { photoResolution: 'max' },
  ]);

  const fps = Math.min(format?.maxFps ?? 1, targetFps);

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'granted');
    })();
  }, []);

  // return <View style={{ flex: 1, backgroundColor: 'red' }} />;
  return (
    device != null &&
    hasPermission && (
      <>
        <Camera
          style={StyleSheet.absoluteFill}
          device={device}
          format={format}
          fps={fps}
          isActive={true}
          orientation="portrait"
          frameProcessor={frameProcessor}
        />
        {barcodes.map((barcode, idx) => (
          <Text key={idx} style={styles.barcodeTextURL}>
            {barcode.displayValue}
          </Text>
        ))}
      </>
    )
  );
}

const styles = StyleSheet.create({
  barcodeTextURL: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
