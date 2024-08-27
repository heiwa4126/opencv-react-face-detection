import cv from "@techstark/opencv-js";
import { useEffect, useRef, useState } from "react";
import { detectHaarFace, loadHaarFaceModels } from "./haarFaceDetection";

function App() {
	const [modelLoaded, setModelLoaded] = useState(false);

	useEffect(() => {
		// モデルがロードされたらmodelLoadedをtrueにするuseEffect
		loadHaarFaceModels().then(() => {
			setModelLoaded(true);
		});
	}, []);

	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasInRef = useRef<HTMLCanvasElement>(null);
	const canvasOutRef = useRef<HTMLCanvasElement>(null);

	// 上のuseEffect()でmodelがLoadedされたら
	// カメラへのアクセスとビデオストリームの設定
	useEffect(() => {
		if (!modelLoaded) return;

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: false })
			.then((stream) => {
				if (videoRef.current) {
					videoRef.current.srcObject = stream;
				}
			})
			.catch((err) => {
				console.error("Error accessing the camera: ", err);
			});

		// コンポーネントがアンマウントされたときにカメラストリームを停止する
		return () => {
			if (videoRef.current?.srcObject) {
				const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
				// biome-ignore lint/complexity/noForEach: <explanation>
				tracks.forEach((track) => track.stop());
			}
		};
	}, [modelLoaded]);

	const captureSnapshot = () => {
		if (!(videoRef?.current && canvasInRef?.current && canvasOutRef?.current)) return;

		const canvas = canvasInRef.current;
		const video = videoRef.current;
		const context = canvas.getContext("2d", { willReadFrequently: true });
		if (!context) return;

		// ビデオの現在のフレームをキャンバスに描画
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		context.drawImage(video, 0, 0, canvas.width, canvas.height);

		// 以下、顔認識処理
		const imgIn = cv.imread(canvasInRef.current);
		detectHaarFace(imgIn).then((imgOut) => {
			if (canvasOutRef.current) {
				cv.imshow(canvasOutRef.current, imgOut);
				imgOut.delete();
				// imgIn.delete(); // detectHaarFace()でimgInとimgOutは同じオブジェクトを指している
			}
		});
	};

	return (
		<div className="App">
			<h2>Capture Video (c2)</h2>
			<video className="webcam" ref={videoRef} autoPlay={true} muted={true} />
			<canvas className="inputImage" ref={canvasInRef} />
			<canvas className="outputImage" ref={canvasOutRef} />
			<br />
			{modelLoaded ? (
				<button type="button" onClick={captureSnapshot}>
					Capture Snapshot
				</button>
			) : (
				<div>Loading Haar-cascade face model...</div>
			)}
		</div>
	);
}

export default App;
