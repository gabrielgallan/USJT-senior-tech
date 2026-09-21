import { AccessibilityToolbar } from "@/components/accessibility-toolbar";
import { ShieldCheck } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export function DefaultLayout() {
	return (
		<div className="flex min-h-screen flex-1 flex-col">
			<a
				className="fixed top-3 left-3 z-50 -translate-y-[150%] rounded-lg bg-card px-4 py-3 font-semibold text-card-foreground outline-none transition-transform focus:translate-y-0 focus-visible:ring-3 focus-visible:ring-ring"
				href="#conteudo-principal"
			>
				Pular para o conteúdo principal
			</a>

			<header className="bg-sidebar text-sidebar-foreground">
				<div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 md:min-h-20 md:flex-row md:flex-wrap md:items-center md:justify-between md:gap-5 md:py-4 lg:px-8">
					<Link
						className="flex min-h-11 max-w-full items-center gap-3 rounded-lg font-bold text-lg outline-none focus-visible:ring-3 focus-visible:ring-sidebar-ring/80 sm:text-xl"
						to="/"
					>
						<ShieldCheck aria-hidden="true" className="size-6 shrink-0 sm:size-7" />
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
