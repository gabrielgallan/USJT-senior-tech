import {
	index,
	layout,
	route,
	type RouteConfig,
} from "@react-router/dev/routes";

export default [
	layout("./app/layouts/default.tsx", [
		index("./app/pages/home.tsx"),
		route("video", "./app/pages/video.tsx"),
		route("quiz", "./app/pages/quiz.tsx"),
	]),
] satisfies RouteConfig;
