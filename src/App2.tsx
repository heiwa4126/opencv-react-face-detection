import cv from "@techstark/opencv-js";
import { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { detectHaarFace, loadHaarFaceModels } from "./haarFaceDetection";

function App() {
	const [modelLoaded, setModelLoaded] = useState(false);

	useEffect(() => {
		// モデルがロードされたらmodelLoadedをtrueにするuseEffect
		loadHaarFaceModels().then(() => {
			setModelLoaded(true);
		});
	}, []);

	const webcamRef = useRef<Webcam>(null);
	const imgRef = useRef<HTMLImageElement>(null);
	const faceImgRef = useRef<HTMLCanvasElement>(null);

	useEffect(() => {
		// modelLoadedが変わったら発火

		if (!modelLoaded) return; //これは不要かもしれんが

		const detectFace = async () => {
			const imageSrc = webcamRef.current?.getScreenshot();
			if (!imageSrc) return;

			return new Promise<void>((resolve) => {
				if (imgRef.current) {
					imgRef.current.src = imageSrc;
					imgRef.current.onload = async () => {
						try {
							if (imgRef.current) {
								const img = cv.imread(imgRef.current as HTMLElement);
								await detectHaarFace(img);
								if (faceImgRef.current) {
									cv.imshow(faceImgRef.current, img);
								}
								img.delete();
								resolve();
							}
						} catch (error) {
							console.log(error);
							resolve();
						}
					};
				}
			});
		};

		// 以下おおむね 1/60秒ごとにdetectFace()を呼び出すループ
		let handle: number;
		const nextTick = () => {
			handle = requestAnimationFrame(async () => {
				await detectFace();
				nextTick(); // 自分自身を呼び出す
			});
		};
		nextTick();
		// 上のループのクリーンアップ関数を返す
		return () => {
			cancelAnimationFrame(handle);
		};
	}, [modelLoaded]);

	return (
		<div className="App">
			<h2>Real-time Face Detection (2)</h2>
			<Webcam ref={webcamRef} className="webcam" mirrored screenshotFormat="image/jpeg" />
			<img className="inputImage" alt="input" ref={imgRef} />
			<canvas className="outputImage" ref={faceImgRef} />
			{!modelLoaded && <div>Loading Haar-cascade face model...</div>}
		</div>
	);
}

export default App;
