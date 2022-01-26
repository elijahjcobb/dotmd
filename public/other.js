/**
 * Elijah Cobb
 * elijah@elijahcobb.com
 * elijahcobb.com
 * github.com/elijahjcobb
 */

if ("serviceWorker" in navigator) {
	navigator.serviceWorker.register("/service-worker.js").catch(console.error);
}