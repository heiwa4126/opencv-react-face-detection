import { useEffect, useRef } from "react";

function App() {
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasRef = useRef<HTMLCanvasElement>(null);

	// カメラへのアクセスとビデオストリームの設定
	useEffect(() => {
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
	}, []);

	const captureSnapshot = () => {
		if (!videoRef?.current || !canvasRef?.current) return;

		const canvas = canvasRef.current;
		const video = videoRef.current;
		const context = canvas.getContext("2d", { willReadFrequently: true });

		// ビデオの現在のフレームをキャンバスに描画(これをソースにする予定)
		canvas.width = video.videoWidth;
		canvas.height = video.videoHeight;
		context?.drawImage(video, 0, 0, canvas.width, canvas.height);
	};

	return (
		<div className="App">
			<h2>Capture Video (c1)</h2>
			<video className="webcam" ref={videoRef} autoPlay={true} muted={true} />
			<canvas className="outputImage" ref={canvasRef} />
			<br />
			<button type="button" onClick={captureSnapshot}>
				Capture Snapshot
			</button>
		</div>
	);
}

export default App;
