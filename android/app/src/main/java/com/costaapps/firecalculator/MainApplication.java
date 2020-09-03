package com.costaapps.firecalculator;

import android.app.Application;

import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactApplication;
import io.realm.react.RealmReactPackage;
import com.reactnativecommunity.picker.RNCPickerPackage;
import com.thebylito.navigationbarcolor.NavigationBarColorPackage;
import io.realm.react.RealmReactPackage;
import com.th3rdwave.safeareacontext.SafeAreaContextPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.swmansion.reanimated.ReanimatedPackage;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RealmReactPackage(),
            new RNCPickerPackage(),
            new NavigationBarColorPackage(),
            new RealmReactPackage(),
            new SafeAreaContextPackage(),
            new ReanimatedPackage(),
          new RNGestureHandlerPackage(),
          new ReactSliderPackage(),
          new VectorIconsPackage(),
          new RNCardViewPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
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
