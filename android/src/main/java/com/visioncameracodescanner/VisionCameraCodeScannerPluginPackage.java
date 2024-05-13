 package com.visioncameracodescanner;

 import androidx.annotation.NonNull;

 import com.facebook.react.ReactPackage;
 import com.facebook.react.bridge.NativeModule;
 import com.facebook.react.bridge.ReactApplicationContext;
 import com.facebook.react.uimanager.ViewManager;

 import com.mrousavy.camera.frameprocessors.FrameProcessorPluginRegistry;

 import java.util.Collections;
 import java.util.List;

 public class VisionCameraCodeScannerPluginPackage implements ReactPackage {
   @NonNull
   @Override
   public List<NativeModule> createNativeModules(@NonNull ReactApplicationContext reactContext) {
     FrameProcessorPluginRegistry.addFrameProcessorPlugin("scanCodes", VisionCameraCodeScannerPlugin::new);

     return Collections.emptyList();
   }

   @NonNull
   @Override
   public List<ViewManager> createViewManagers(@NonNull ReactApplicationContext reactContext) {
     return Collections.emptyList();
   }
 }
