import * as React from "react";

const FONT_SCALES = [100, 125, 150, 175, 200] as const;
const FONT_SCALE_STORAGE_KEY = "senior-tech.font-scale";

export type FontScale = (typeof FONT_SCALES)[number];

type AccessibilityProviderProps = {
	children: React.ReactNode;
};

type AccessibilityProviderState = {
	fontScale: FontScale;
	canDecreaseFontScale: boolean;
	canIncreaseFontScale: boolean;
	decreaseFontScale: () => void;
	increaseFontScale: () => void;
	resetFontScale: () => void;
};

const AccessibilityContext = React.createContext<
	AccessibilityProviderState | undefined
>(undefined);

function isFontScale(value: number): value is FontScale {
	return FONT_SCALES.some((fontScale) => fontScale === value);
}

function getInitialFontScale(): FontScale {
	const storedValue = Number(localStorage.getItem(FONT_SCALE_STORAGE_KEY));
	return isFontScale(storedValue) ? storedValue : 100;
}

export function AccessibilityProvider({
	children,
}: AccessibilityProviderProps) {
	const [fontScale, setFontScale] = React.useState<FontScale>(
		getInitialFontScale,
	);

	React.useLayoutEffect(() => {
		document.documentElement.dataset.fontScale = String(fontScale);
		localStorage.setItem(FONT_SCALE_STORAGE_KEY, String(fontScale));
	}, [fontScale]);

	React.useEffect(() => {
		const handleStorageChange = (event: StorageEvent) => {
			if (event.key !== FONT_SCALE_STORAGE_KEY || event.newValue === null) {
				return;
			}

			const storedValue = Number(event.newValue);
			if (isFontScale(storedValue)) {
				setFontScale(storedValue);
			}
		};

		window.addEventListener("storage", handleStorageChange);
		return () => window.removeEventListener("storage", handleStorageChange);
	}, []);

	const currentIndex = FONT_SCALES.indexOf(fontScale);

	const decreaseFontScale = React.useCallback(() => {
		setFontScale((currentScale) => {
			const index = FONT_SCALES.indexOf(currentScale);
			return FONT_SCALES[Math.max(0, index - 1)];
		});
	}, []);

	const increaseFontScale = React.useCallback(() => {
		setFontScale((currentScale) => {
			const index = FONT_SCALES.indexOf(currentScale);
			return FONT_SCALES[Math.min(FONT_SCALES.length - 1, index + 1)];
		});
	}, []);

	const resetFontScale = React.useCallback(() => setFontScale(100), []);

	const value = React.useMemo(
		() => ({
			fontScale,
			canDecreaseFontScale: currentIndex > 0,
			canIncreaseFontScale: currentIndex < FONT_SCALES.length - 1,
			decreaseFontScale,
			increaseFontScale,
			resetFontScale,
		}),
		[
			currentIndex,
			decreaseFontScale,
			fontScale,
			increaseFontScale,
			resetFontScale,
		],
	);

	return (
		<AccessibilityContext.Provider value={value}>
			{children}
		</AccessibilityContext.Provider>
	);
}

export function useAccessibility() {
	const context = React.useContext(AccessibilityContext);

	if (context === undefined) {
		throw new Error(
			"useAccessibility must be used within an AccessibilityProvider",
		);
	}

	return context;
}
