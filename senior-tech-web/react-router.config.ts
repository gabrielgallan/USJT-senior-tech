import type { Config } from "@react-router/dev/config";

export default {
	appDirectory: "src",
	prerender: ["/", "/video", "/quiz"],
	ssr: false,
} satisfies Config;
