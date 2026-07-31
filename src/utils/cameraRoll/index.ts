// 实现保存相册等功能
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import { Alert, Image, Platform, PermissionsAndroid } from 'react-native';

import ReactNativeBlobUtil from 'react-native-blob-util';
import FastImage from 'react-native-fast-image';

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (parseFloat(Platform.Version.toString()) >= 33) {
      return Promise.all([
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        ),
        PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
        ),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      );
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (parseFloat(Platform.Version.toString()) >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        statuses =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      ).then(status => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

export async function save(tag: string) {
  if (Platform.OS === 'android' && !(await hasAndroidPermission())) {
    Alert.alert('权限不足');
    return;
  }
  // Alert.alert(tag)

  // 1. 定义缓存路径（如果明确是 webp 或为了通用，我们可以统一转存为 .jpg 临时文件）
  try {
    // iOS 对 JPG/PNG 的兼容性最好
    const fileName = tag.split('/').pop()?.split('?')[0] || 'image.jpg';
    const baseName =
      fileName.substring(0, fileName.lastIndexOf('.')) || 'image';

    // 强制在 iOS 下将目标后缀改为 .jpg（或者根据需要改）
    const ext =
      Platform.OS === 'ios' ? 'jpg' : fileName.split('.').pop() || 'jpg';
    const cachePath = `${ReactNativeBlobUtil.fs.dirs.CacheDir}/${baseName}_converted.${ext}`;
    console.log(cachePath, tag);
    const res = await ReactNativeBlobUtil.config({
      fileCache: true,
      path: cachePath,
    })
      .fetch(
        'GET',
        tag, // 关键：补全请求头，解决防盗链拦截
      )
      .progress((received, total) => {
        console.log(received, total);
      });

    const filePath = res.path();

    const photoIdentifier = await CameraRoll.saveAsset(filePath, {
      album: 'doubao',
    });
    console.log(photoIdentifier);

    await ReactNativeBlobUtil.fs.unlink(cachePath);
    Alert.alert('保存相册成功');
  } catch (e) {
    Alert.alert((e as Error).message);
  }
}
