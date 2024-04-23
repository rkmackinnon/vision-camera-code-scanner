#import <Foundation/Foundation.h>

#import "VisionCameraCodeScanner.h"
#if defined __has_include && __has_include("VisionCameraCodeScanner-Swift.h")
#import "VisionCameraCodeScanner-Swift.h"
#else
#import <VisionCameraCodeScanner/VisionCameraCodeScanner-Swift.h>
#endif

@implementation RegisterPlugins

    + (void) load {
        [FrameProcessorPluginRegistry addFrameProcessorPlugin:@"scanCodes" withInitializer:^FrameProcessorPlugin * _Nonnull(VisionCameraProxyHolder * _Nonnull proxy, NSDictionary * _Nullable options) {
            return [[VisionCameraCodeScanner alloc] initWithProxy:proxy withOptions:options];
        }];
    }

@end
