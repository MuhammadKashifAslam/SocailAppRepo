package com.demo

import android.os.Bundle
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.zoontek.rnbootsplash.RNBootSplash  // Import RNBootSplash
import com.swmansion.gesturehandler.react.RNGestureHandlerEnabledRootView // Import RNGestureHandler

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    RNBootSplash.init(this, R.style.SplashTheme)  // Initialize RNBootSplash with SplashTheme
    super.onCreate(savedInstanceState)
  }

  override fun getMainComponentName(): String = "Demo"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return object : DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled) {
      override fun createRootView(): RNGestureHandlerEnabledRootView {
        return RNGestureHandlerEnabledRootView(this@MainActivity)
      }
    }
  }
}
