# opencv-react-face-detection

OpenCV.js で、リアルタイム顔検出の勉強。
(実際に使っているのは [TechStark/opencv-js](https://github.com/TechStark/opencv-js))。

コードの元ネタは

- <https://codesandbox.io/p/sandbox/opencv-js-face-detection-i1i3u>
  (via [TechStark/opencv-js: OpenCV JavaScript version for node.js or browser](https://github.com/TechStark/opencv-js)) - v1 はこれを TypeScript にしただけ
- 元ネタの元ネタ - [OpenCV: Face Detection using Haar Cascades](https://docs.opencv.org/4.x/d2/d99/tutorial_js_face_detection.html)

## モデル

haarcascade_frontalface_default.xml は
<https://raw.githubusercontent.com/kipr/opencv/master/data/haarcascades/haarcascade_frontalface_default.xml>
から取得して `public/models/` の下に置いてください。

```sh
MODEL=haarcascade_frontalface_default.xml
URL=https://raw.githubusercontent.com/kipr/opencv/master/data/haarcascades
mkdir -p public/models
curl -L "$URL/$MODEL" -o "public/models/$MODEL"
```

## 開発

React で Vite で TypeScript で Bun。
git

```sh
bun i
bun dev
bun run build && bun preview
#
bun format # biomeがあれば
bun check # biomeがあれば
```

## TODO

- CSS がデタラメなので直す。
- モデルの XML を minify する。いまのところうまくいってない。
- 目も書く [OpenCV: Face Detection using Haar Cascades](https://docs.opencv.org/4.x/d2/d99/tutorial_js_face_detection.html)。モデルもう 1 個読む必要がある。
- GitHub Pages にする。
