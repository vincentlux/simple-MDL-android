package com.mdl;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.filepicker.FilePickerPackage; // import package
import com.RNFetchBlob.RNFetchBlobPackage;    
import com.wenkesj.voice.VoicePackage;
import com.reactnativecommunity.webview.RNCWebViewPackage;


import java.util.Arrays;
import java.util.List; 

public class MainApplication extends Application implements ReactApplication {


  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    // @Override
    // protected List<ReactPackage> getPackages() {
    //   return Arrays.<ReactPackage>asList(
    //       new MainReactPackage(),
            
    //   );
    // }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
    @Override
    protected List<ReactPackage> getPackages() {
        return Arrays.<ReactPackage>asList(
            new MainReactPackage(),
            new FilePickerPackage(),
            new RNFetchBlobPackage(),
            new VoicePackage(),
            new RNGestureHandlerPackage(),
            new RNCWebViewPackage()
        );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
