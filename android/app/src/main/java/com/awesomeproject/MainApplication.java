package com.awesomeproject;

import android.app.Application;

import io.realm.react.RealmReactPackage;
import com.facebook.react.ReactApplication;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.reactnativecommunity.slider.ReactSliderPackage;
import dog.craftz.sqlite_2.RNSqlite2Package;
import kim.taegon.rnintl.ReactNativeIntlPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.kishanjvaghela.cardview.RNCardViewPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

import org.pgsqlite.SQLitePluginPackage;

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
            new RNGestureHandlerPackage(),
            new ReactSliderPackage(),
            new RNSqlite2Package(),
            new ReactNativeIntlPackage(),
            new SQLitePluginPackage(),   // register SQLite Plugin here 
            new VectorIconsPackage(),
 	    new RealmReactPackage(),
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
