import cv from "@techstark/opencv-js";
import { loadDataFile } from "./cvDataFile";

let faceCascade: cv.CascadeClassifier;

const model = "haarcascade_frontalface_default.xml";

export async function loadHaarFaceModels() {
	console.log("=======start downloading Haar-cascade models=======");
	return loadDataFile(model, `models/${model}`)
		.then(
			() =>
				new Promise<void>((resolve) => {
					setTimeout(() => {
						// load pre-trained classifiers
						faceCascade = new cv.CascadeClassifier();
						faceCascade.load(model);
						resolve();
					}, 2000);
				}),
		)
		.then(() => {
			console.log("=======downloaded Haar-cascade models=======");
		})
		.catch((error) => {
			console.error(error);
		});
}

/**
 * Detect faces from the input image.
 * See https://docs.opencv.org/master/d2/d99/tutorial_js_face_detection.html
 * @param {cv.Mat} img Input image
 * @returns the modified image with detected faces drawn on it.
 */
export async function detectHaarFace(img: cv.Mat) {
	// const cv = await getOpenCv();
	const msize = new cv.Size(0, 0);

	// const newImg = img.clone();
	const newImg = img; // NOTE: 実はnewImgとimgは同じオブジェクトを指している

	const gray = new cv.Mat();
	cv.cvtColor(newImg, gray, cv.COLOR_RGBA2GRAY, 0);

	const faces = new cv.RectVector();

	// detect faces
	faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
	for (let i = 0; i < faces.size(); ++i) {
		const point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
		const point2 = new cv.Point(
			faces.get(i).x + faces.get(i).width,
			faces.get(i).y + faces.get(i).height,
		);
		cv.rectangle(newImg, point1, point2, [255, 0, 0, 255]);
	}

	gray.delete();
	faces.delete();

	return newImg;
}
