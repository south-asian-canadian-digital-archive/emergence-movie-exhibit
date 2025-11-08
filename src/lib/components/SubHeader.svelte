<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { gsap } from "gsap";
  import { ScrollToPlugin } from "gsap/all";
  import { base } from "$app/paths";
  import logo from "$lib/assets/logo.png";
  import { IsMobile } from "$lib/hooks/is-mobile.svelte.ts";

  const isMobile = new IsMobile();

  let lastScrollY = $state(0);
  let isHidden = $state(false);
  let menuOpen = $state(false);
  let tween: gsap.core.Tween | undefined;

  const navigationItems = [
    { label: "Home", target: "/" },
    { label: "About", target: "#about" },
    { label: "Watch", target: "#watch-now" },
    { label: "Cast & Crew", target: "#cast" },
    { label: "Awards", target: "#awards" },
    { label: "More", target: "#other-links" },
  ];

  function handleNavigation(target: string) {
    if (target === "/") {
      // Navigate to home page with base path
      window.location.href = base || "/";
      return;
    }

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

  function handleScroll() {
    if (!browser) return;

    const currentScrollY = window.scrollY;

    const headerHeight = 100;
    const delayVh = window.innerHeight * 0.4;
    const hideThreshold = headerHeight + delayVh;

    if (currentScrollY <= hideThreshold) {
      if (isHidden) {
        showHeader();
      }
      lastScrollY = currentScrollY;
      return;
    }

    const scrollingDown = currentScrollY > lastScrollY;
    const scrollingUp = currentScrollY < lastScrollY;

    if (Math.abs(currentScrollY - lastScrollY) > 5) {
      if (scrollingDown && !isHidden) {
        hideHeader();
      } else if (scrollingUp && isHidden) {
        showHeader();
      }
    }

    lastScrollY = currentScrollY;
  }

  function hideHeader() {
    if (isHidden) return;

    if (tween) tween.kill();

    isHidden = true;
    menuOpen = false;
    tween = gsap.to("#subheader", {
      y: "-100%",
      duration: 0.3,
      ease: "power2.out",
    });
  }

  function showHeader() {
    if (!isHidden) return;

    if (tween) tween.kill();

    isHidden = false;
    tween = gsap.to("#subheader", {
      y: "0%",
      duration: 0.4,
      ease: "power2.out",
    });
  }

  onMount(() => {
    if (browser) {
      gsap.registerPlugin(ScrollToPlugin);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
  });

  onDestroy(() => {
    if (browser) {
      window.removeEventListener("scroll", handleScroll);
    }
    if (tween) tween.kill();
  });
</script>

<div
  id="subheader"
  class="sticky top-0 w-full z-40 -mt-2 text-white mix-blend-difference"
>
  <div
    class="flex flex-row items-start justify-between w-full px-4 md:px-8 py-2"
  >
    <!-- Left Section: Film Credit -->
    <div class="flex-1 flex justify-start">
      <div
        class="font-[Bebas_Neue] text-sm text-left md:text-lg tracking-wide uppercase font-bold select-none flex items-center gap-2 bg-black bg-opacity-90 backdrop-blur-lg {isMobile.current
          ? 'text-center'
          : ''}"
        style={isMobile.current
          ? "text-shadow: 2px 2px 4px rgba(0,0,0,0.7);"
          : ""}
      >
        A FILM BY{#if isMobile.current}<br />{/if} VINAY GIRIDHAR
      </div>
    </div>

    <!-- Middle Section: Logo -->
    <div class="flex-1 flex justify-center mix-blend-normal">
      <img src={logo} alt="Logo" class="h-12 w-auto object-contain" />
    </div>

    <!-- Right Section: Navigation Menu -->
    <div class="flex-1 flex justify-end relative">
      {#if isMobile.current}
        <button
          onclick={() => (menuOpen = !menuOpen)}
          class="flex flex-col justify-center items-center w-8 h-8 space-y-1"
          aria-label="Toggle menu"
        >
          <span
            class="block w-6 h-0.5 bg-white transition-transform duration-200 {menuOpen
              ? 'rotate-45 translate-y-1.5'
              : ''}"
          ></span>
          <span
            class="block w-6 h-0.5 bg-white transition-opacity duration-200 {menuOpen
              ? 'opacity-0'
              : ''}"
          ></span>
          <span
            class="block w-6 h-0.5 bg-white transition-transform duration-200 {menuOpen
              ? '-rotate-45 -translate-y-1.5'
              : ''}"
          ></span>
        </button>
        <div
          class="absolute top-full right-0 mt-2 bg-black bg-opacity-90 text-white p-4 rounded shadow-lg z-50 backdrop-blur-lg transition-all duration-300 {menuOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2'}"
        >
          <nav class="flex flex-col gap-2 text-right">
            {#each navigationItems as item}
              <button
                onclick={() => {
                  handleNavigation(item.target);
                  menuOpen = false;
                }}
                class="text-sm font-[Poppins] uppercase cursor-pointer hover:text-gray-300 transition-colors text-right"
                style="text-shadow: 2px 2px 4px rgba(0,0,0,0.7);"
              >
                {item.label}
              </button>
            {/each}
          </nav>
        </div>
      {:else}
        <nav class="flex text-right gap-3">
          {#each navigationItems as item}
            <div class="flex flex-col items-center overflow-hidden">
              <!-- svelte-ignore a11y_click_events_have_key_events -->
              <!-- svelte-ignore a11y_no_static_element_interactions -->
              <span
                onclick={() => handleNavigation(item.target)}
                class="group text-xs md:text-sm tracking-tight font-[Poppins] uppercase transition-all duration-200 w-full cursor-pointer font-bold text-right"
                style={isMobile.current
                  ? "text-shadow: 2px 2px 4px rgba(0,0,0,0.7);"
                  : ""}
              >
                <span class="block">{item.label}</span>
                <span
                  class="block h-0.5 bg-white rounded transition-all duration-200 ease-in-out w-0 group-hover:w-full"
                ></span>
              </span>
            </div>
          {/each}
        </nav>
      {/if}
    </div>
  </div>
</div>
