import { AccessibilityToolbar } from "@/components/accessibility-toolbar";
import { ShieldCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function DefaultLayout() {
	return (
		<div className="flex min-h-screen flex-1 flex-col">
			<a
				className="fixed top-3 left-3 z-50 -translate-y-24 rounded-lg bg-card px-4 py-3 font-semibold text-card-foreground outline-none transition-transform focus:translate-y-0 focus-visible:ring-3 focus-visible:ring-ring"
				href="#conteudo-principal"
			>
				Pular para o conteúdo principal
			</a>

			<header className="bg-sidebar text-sidebar-foreground">
				<div className="mx-auto min-h-20 flex w-full max-w-7xl flex-wrap items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
					<Link
						className="flex min-h-11 items-center gap-3 rounded-lg font-bold text-xl outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring/80"
						to="/"
					>
						<ShieldCheck aria-hidden="true" className="size-7 shrink-0" />
						<span>Pare, Pense e Confirme</span>
					</Link>
					<AccessibilityToolbar />
				</div>
			</header>

			<main
				className="flex w-full flex-1"
				id="conteudo-principal"
				tabIndex={-1}
			>
				<Outlet />
			</main>
		</div>
	);
}
