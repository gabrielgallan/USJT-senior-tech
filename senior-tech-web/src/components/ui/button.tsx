import { Button as ButtonPrimitive } from "@base-ui/react/button";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
	"group/button inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-base font-semibold whitespace-nowrap outline-none select-none transition-[background-color,color,border-color,box-shadow] duration-200 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-5",
	{
		variants: {
			variant: {
				default:
					"bg-primary text-primary-foreground hover:bg-[color-mix(in_oklch,var(--primary),black_12%)]",
				outline:
					"border-border bg-background hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				secondary:
					"bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground",
				ghost:
					"hover:bg-muted hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
				success:
					"bg-success text-success-foreground hover:bg-[color-mix(in_oklch,var(--success),black_12%)]",
				destructive:
					"bg-destructive text-destructive-foreground hover:bg-[color-mix(in_oklch,var(--destructive),black_10%)] focus-visible:border-destructive focus-visible:ring-destructive/30",
				link: "text-primary underline-offset-4 hover:underline",
			},
			size: {
				default:
					"h-11 gap-2 px-4 has-data-[icon=inline-end]:pr-3.5 has-data-[icon=inline-start]:pl-3.5",
				xs: "h-9 gap-1.5 px-3 text-sm [&_svg:not([class*='size-'])]:size-4",
				sm: "h-10 gap-1.5 px-3.5 text-sm [&_svg:not([class*='size-'])]:size-4",
				lg: "h-12 gap-2 px-5 text-lg",
				icon: "size-11",
				"icon-xs":
					"size-9 [&_svg:not([class*='size-'])]:size-4",
				"icon-sm":
					"size-10 [&_svg:not([class*='size-'])]:size-4",
				"icon-lg": "size-12",
			},
		},
		defaultVariants: {
			variant: "default",
			size: "default",
		},
	},
);

function Button({
	className,
	variant = "default",
	size = "default",
	...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
	return (
		<ButtonPrimitive
			data-slot="button"
			className={cn(buttonVariants({ variant, size, className }))}
			{...props}
		/>
	);
}

export { Button, buttonVariants };
