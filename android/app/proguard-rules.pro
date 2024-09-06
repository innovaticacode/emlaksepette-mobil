# By default, the flags in this file are appended to flags specified
# in /usr/local/Cellar/android-sdk/24.3.3/tools/proguard/proguard-android.txt
# You can edit the include path and order by changing the proguardFiles
# directive in build.gradle.

# For more details, see
#   http://developer.android.com/guide/developing/tools/proguard.html

# Keep class names for React Native and Hermes
-keep class com.facebook.react.** { *; }
-dontwarn com.facebook.react.**

-keep class com.facebook.hermes.** { *; }
-dontwarn com.facebook.hermes.**

# Keep class names for React Native Reanimated
-keep class com.swmansion.reanimated.** { *; }
-keep class com.facebook.react.turbomodule.** { *; }

# Keep class names for React Native libraries
-keep class com.facebook.react.uimanager.** { *; }
-keep class com.facebook.react.bridge.** { *; }
-keep class com.facebook.react.module.model.** { *; }
-keep class com.facebook.react.modules.core.** { *; }
-keep class com.facebook.react.views.** { *; }
-keep class com.facebook.common.logging.** { *; }
-keep class com.facebook.fresco.** { *; }
-keep class com.facebook.imagepipeline.** { *; }
-keep class com.facebook.jni.** { *; }

# Keep class names for React Native Navigation
-keep class com.reactnativenavigation.** { *; }
-dontwarn com.reactnativenavigation.**

# Keep annotations
-keepattributes *Annotation*

# Keep public classes and interfaces
-keep public class * {
    public protected *;
}

# Keep native method names
-keepclasseswithmembernames class * {
    native <methods>;
}

# Parcelables
-keepclassmembers class * implements android.os.Parcelable {
    static ** CREATOR;
}

# Keep Gson
-keep class com.google.gson.** { *; }
-dontwarn com.google.gson.**

# Keep OkHttp
-keep class okhttp3.** { *; }
-dontwarn okhttp3.**

# Keep Retrofit
-keep class retrofit2.** { *; }
-dontwarn retrofit2.**

# Keep Timber
-keep class timber.log.** { *; }
-dontwarn timber.log.**

# Keep Glide
-keep class com.bumptech.glide.** { *; }
-dontwarn com.bumptech.glide.**

# Keep ExoPlayer
-keep class com.google.android.exoplayer2.** { *; }
-dontwarn com.google.android.exoplayer2.**

# Keep Kotlin
-keep class kotlin.** { *; }
-dontwarn kotlin.**
-keepclassmembers class kotlin.Metadata {
    public <fields>;
}

# Keep Dagger
-keep class dagger.** { *; }
-dontwarn dagger.**

# Keep Hilt
-keep class dagger.hilt.** { *; }
-dontwarn dagger.hilt.**

# Keep Realm
-keep class io.realm.** { *; }
-dontwarn io.realm.**

# Keep Room
-keep class androidx.room.** { *; }
-dontwarn androidx.room.**

# Keep Moshi
-keep class com.squareup.moshi.** { *; }
-dontwarn com.squareup.moshi.**

# Keep Coroutines
-keep class kotlinx.coroutines.** { *; }
-dontwarn kotlinx.coroutines.**

# Keep Play Services
-keep class com.google.android.gms.** { *; }
-dontwarn com.google.android.gms.**

