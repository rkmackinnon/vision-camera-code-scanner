import {
  ReadonlyFrameProcessor,
  useFrameProcessor,
} from 'react-native-vision-camera';
import { useState } from 'react';

import {
  type Barcode,
  BarcodeFormat,
  type CodeScannerOptions,
  DefaultCodeScannerOptions,
  scanBarcodes,
} from './index';
import { useRunInJS } from 'react-native-worklets-core';

export function useScanBarcodes(
  types: BarcodeFormat[],
  options: CodeScannerOptions = DefaultCodeScannerOptions
): [ReadonlyFrameProcessor, Barcode[]] {
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);

  const setBarcodeInJS = useRunInJS((e) => setBarcodes(e), [setBarcodes]);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      'worklet';
      // For some reason, arguments to hooks accessed from worklets don't have the same runtime type they
      // are declared as. This leads to tricky errors, hence the Array.from and reduce on the options' keys.
      //
      // Example error:
      // Frame Processor threw an error: Exception in HostFunction: Received an unknown HostObject! Cannot convert to a JNI value.
      const opts = Object.keys(options || {}).reduce((acc, key) => {
        acc[key as keyof CodeScannerOptions] = (options || {})[
          key as keyof CodeScannerOptions
        ];
        return acc;
      }, {} as CodeScannerOptions);

      ('worklet');
      const detectedBarcodes = scanBarcodes(frame, Array.from(types), opts);
      setBarcodeInJS(detectedBarcodes);
      console.log('🚀 ~ frameProcessor ~ detectedBarcodes:', detectedBarcodes);
    },
    [options, types, setBarcodes]
  );

  return [frameProcessor, barcodes];
}
