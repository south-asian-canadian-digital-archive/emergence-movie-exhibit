import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { base } from "$app/paths";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

/**
 * Resolves static asset paths with the configured base path.
 * This is a helper wrapper around SvelteKit's base path that handles
 * string paths from JSON data or other dynamic sources.
 * 
 * @param path - The path to a static asset (e.g., "/logo.png")
 * @returns The resolved path with base path prefix
 * 
 * @example
 * ```svelte
 * <img src={withBase("/logo.png")} alt="Logo" />
 * ```
 */
export function withBase(path: string | null | undefined): string {
	if (!path) return '';
	// Ensure path starts with /
	const normalizedPath = path.startsWith('/') ? path : `/${path}`;
	return `${base}${normalizedPath}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
