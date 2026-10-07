import type { Config } from "@react-router/dev/config";

export default {
	appDirectory: "src",
	prerender: ["/", "/video", "/reflexao", "/quiz"],
	ssr: false,
} satisfies Config;
