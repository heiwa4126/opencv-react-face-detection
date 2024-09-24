import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import cdn from "vite-plugin-cdn-import";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		react(),
		cdn({
			modules: [
				"react",
				"react-dom",
				// "react-router-dom",
				// {
				// 	name: "react-webcam",
				// 	var: "react-webcam",
				// 	path: "dist/react-webcam.min.js",
				// },
				{
					name: "@techstark/opencv-js",
					var: "cv",
					path: "dist/opencv.min.js",
				},
			],
		}),
	],
	// build: {
	// 	minify: "esbuild",
	// 	rollupOptions: {
	// 		output: {
	// 			manualChunks: {
	// 				r: ["react", "react-dom", "react-router-dom", "react-webcam"],
	// 				c: ["@techstark/opencv-js"],
	// 			},
	// 		},
	// 	},
	// },
});
