<script lang="ts">
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/all";
  import emergenceData from "$lib/content/emergence.json";

  const quickLinks = [
    { label: "About", target: "#about" },
    { label: "Cast & Crew", target: "#cast" },
    { label: "Awards", target: "#awards" },
    { label: "Watch Now", target: "#watch-now" },
  ];

  function handleNavigation(target: string) {
    // Use GSAP ScrollTo for section navigation
    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: target,
        autoKill: false,
        // offsetY: 80, // Account for sticky header
      },
      ease: "power2.inOut",
    });
  }

  onMount(() => {
    if (browser) {
      gsap.registerPlugin(ScrollToPlugin);
    }
  });
</script>

<div class="bg-gray-50 border-t border-gray-200 py-6 px-6 mt-auto relative">
  <div class="max-w-7xl mx-auto">
    <!-- Rights Notice -->
    <div class="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4 hidden">
      <div class="flex">
        <div class="flex-shrink-0">
          <svg
            class="h-5 w-5 text-amber-400"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8.485 2.495c.673-1.167 2.357-1.167 3.03 0l6.28 10.875c.673 1.167-.17 2.625-1.516 2.625H3.72c-1.347 0-2.189-1.458-1.515-2.625L8.485 2.495zM10 5a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 5zm0 9a1 1 0 100-2 1 1 0 000 2z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <div class="ml-3">
          <p class="text-sm text-amber-800">
            <strong>Rights Notice:</strong>
            {emergenceData.rights.notice}
          </p>
        </div>
      </div>
    </div>

    <!-- Quick Links -->
    <nav class="flex flex-wrap justify-center gap-6 mb-4" aria-label="Quick links">
      {#each quickLinks as link}
        <button
          type="button"
          onclick={() => handleNavigation(link.target)}
          class="text-sm text-gray-600 hover:text-emerald-600 font-medium transition-colors cursor-pointer bg-transparent border-none"
        >
          {link.label}
        </button>
      {/each}
    </nav>

    <!-- Contact Info -->
    <div class="text-center text-xs text-gray-500">
      <p>
        Contact: <a
          href="mailto:{emergenceData.rights.contactEmail}"
          class="text-emerald-600 hover:text-emerald-700"
          >{emergenceData.rights.contactEmail}</a
        >
      </p>
    </div>
  </div>
</div>
