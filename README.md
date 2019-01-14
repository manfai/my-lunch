2019-01-14
=============
岩岩down落黎請係cmd打一次
```console
npm install
```


2019-01-05
=============

//BUG:react-devtools 3.5.0 breaks new project
related issue: https://github.com/facebook/react-native/issues/22863
reactDevTools.connectToDevTools is not a function
<code>
$ npm install --save-dev react-devtools-core@3.4.2
</code>

//Receiving Broadcasts
<code>
$ npm install --save laravel-echo pusher-js
</code>

//Export APK
<code>
$ keytool -genkey -v -keystore my-release-key.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000
</code>

Setting up gradle variables
1.Place the my-release-key.keystore file under the android/app directory in your project folder.
2.Edit the file ~/.gradle/gradle.properties or android/gradle.properties, and add the following (replace ***** with the correct keystore password, alias and key password)
<code>
MYAPP_RELEASE_STORE_FILE=my-release-key.keystore
MYAPP_RELEASE_KEY_ALIAS=my-key-alias
MYAPP_RELEASE_STORE_PASSWORD=*****
MYAPP_RELEASE_KEY_PASSWORD=*****
</code>


2019-01-07
=============

//use a new library for usb serial =
https://github.com/melihyarikkaya/react-native-serialport
npm install react-native-serialport --save
Change android/build.gradle minSdkVerision: 23
//BUG: device return data is encoded
// 初步估係base64 encode, 用以下library decode試試
npm install buffer --save
编码 var base64Str = new Buffer(rawStr).toString('base64');
解码 var b = new Buffer(base64Str , 'base64')
var s = b.toString();

//Yeah!!! Not Base64 是HEX 16進制碼
解码 var b = new Buffer(base64Str , 'hex')
var s = b.toString('utf8');
