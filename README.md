# opencv-react-face-detection

OpenCV.js で、リアルタイム顔検出の勉強。

元ネタは
<https://codesandbox.io/p/sandbox/opencv-js-face-detection-i1i3u>
(via [TechStark/opencv-js: OpenCV JavaScript version for node.js or browser](https://github.com/TechStark/opencv-js))

## モデル

haarcascade_frontalface_default.xml は
<https://raw.githubusercontent.com/kipr/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml>
から取得。

```sh
MODEL=haarcascade_frontalface_default.xml
URL=https://raw.githubusercontent.com/kipr/opencv/master/data/haarcascades
mkdir -p public/models
curl -L "$URL/$MODEL" -o "public/models/$MODEL"
```

## TODO

- CSS がデタラメなので直す。
- モデルの XML を minify する。
- 目も書く [OpenCV: Face Detection using Haar Cascades](https://docs.opencv.org/4.x/d2/d99/tutorial_js_face_detection.html)
- github-pages にする。
