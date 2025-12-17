<script lang="ts">
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
  import CastSection from "$lib/components/sections/CastSection.svelte";
  import About from "$lib/components/sections/About.svelte";
  import trailer from "$lib/assets/trailer.mp4";
  import { withBase } from "$lib/utils";
  import Awards from "$lib/components/sections/Awards.svelte";
  import WatchNow from "$lib/components/sections/MoreLinksSection.svelte";
  import emergence from "$lib/content/emergence.json";
  import MediaSection from "$lib/components/sections/WatchNowSection.svelte";
  import { IsMobile } from "$lib/hooks/is-mobile.svelte.ts";

  const isMobile = new IsMobile();

  let coverElm: HTMLElement;
  let awardsSection: HTMLElement;
  let awardsComponent: Awards;

  let videoLoaded = $state(false);

  const scrollToMain = () => {
    gsap.to(window, {
      duration: 0.5,
      scrollTo: {
        y: "#about",
        autoKill: false,
      },
      ease: "power2.inOut",
    });
  };

  onMount(() => {
    videoLoaded = true;
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // apply parallax effect to any element with a data-speed attribute
    gsap.to("[data-speed]", {
      y: (i, el) =>
        (1 - parseFloat(el.getAttribute("data-speed"))) *
        ScrollTrigger.maxScroll(window),
      ease: "none",
      scrollTrigger: {
        start: 0,
        end: "max",
        invalidateOnRefresh: true,
        scrub: 0,
      },
    });

    // Awards section pinning
    if (awardsSection) {
      const awards = emergence.awardsHighlights;

      const pinTrigger = ScrollTrigger.create({
        trigger: awardsSection,
        start: "top top",
        end: () => `+=${awards.length * 100}vh`,
        pin: true,
        pinSpacing: true,
        scrub: 1,
        // markers: true,
        onUpdate: (self) => {
          const progress = Math.min(self.progress, 0.99);
          const newIndex = Math.floor(progress * awards.length);

          // Update award index
          if (awardsComponent && awardsComponent.updateAwardIndex) {
            awardsComponent.updateAwardIndex(newIndex);
          }

          // Update scroll progress for image parallax
          if (awardsComponent && awardsComponent.updateScrollProgress) {
            awardsComponent.updateScrollProgress(self.progress);
          }
        },
      });

      console.log("Awards ScrollTrigger created:", pinTrigger);
    }

    setTimeout(() => {
      if (coverElm) {
        coverElm.scrollIntoView({ behavior: "smooth" });
      }
    }, 1000);
  });
</script>

<svelte:head>
  <title>Emergence: Out of the Shadows - SACDA Digital Exhibit</title>
  <meta
    name="description"
    content="An intimate documentary following three South Asian LGBTQ+ individuals as they navigate identity, family, and belonging. Winner of 7 awards across 51 international film festivals."
  />
  <meta
    property="og:title"
    content="Emergence: Out of the Shadows - Digital Exhibit"
  />
  <meta
    property="og:description"
    content="Discover the powerful stories of Kayden, Jag, and Amar in this acclaimed documentary."
  />
</svelte:head>

<main class="*:rounded-t-2xl">
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
  <section
    bind:this={coverElm}
    class="relative w-full min-h-screen flex items-center justify-center overflow-hidden rounded-none! *:rounded-none!"
    data-cursor-state="indicate-scroll-down"
    aria-label="Click to scroll to main content"
    onclick={scrollToMain}
  >
    <!-- Background Video -->
    <video
      class="absolute inset-0 w-full h-full object-cover pointer-events-none"
      autoplay
      muted
      loop
      playsinline
      disablePictureInPicture={true}
      controls={false}
      poster={withBase("/stills/Kayden Still Photo (1).jpg")}
      preload="none"
    >
      {#if videoLoaded}
        <source src={trailer} type="video/mp4" />
      {/if}
      Your browser does not support the video tag.
    </video>

    <!-- Dark Overlay  box-border shadow-[inset_0_0_10px_10px_black] -->
    <div class="absolute inset-0 blur-sm bg-black/20"></div>

    <div
      class="relative z-10 text-center px-4 w-[80vw] h-[60vh] md:h-full overflow-x-hidden"
    >
      <video
        class="w-full max-w-2xl mx-auto h-full object-cover"
        autoplay
        muted
        loop
        playsinline
        disablePictureInPicture={true}
        poster={withBase("/stills/Kayden Still Photo (1).jpg")}
        preload="none"
      >
        {#if videoLoaded}
          <source src={trailer} type="video/mp4" />
        {/if}
        <img
          src={withBase("/poster.webp")}
          title="Your browser does not support the video tag."
          alt=""
        />
      </video>
    </div>
  </section>

  <section id="about" class="w-full md:h-screen bg-background text-gray-900">
    <About />
  </section>

  <section
    id="watch-now"
    class="w-full md:h-screen bg-gray-900 text-background"
  >
    <MediaSection />
  </section>

  <section id="cast" class="w-full md:h-screen bg-background text-gray-900">
    <CastSection />
  </section>

  <section
    id="awards"
    bind:this={awardsSection}
    class="w-full rounded-t-2xl bg-gray-900 text-background"
  >
    <Awards bind:this={awardsComponent} />
  </section>

  <section
    id="other-links"
    class="w-full min-h-screen flex items-center justify-center bg-background text-gray-900"
  >
    <WatchNow />
  </section>
</main>

<style>
  section {
    position: sticky;
    top: 0;
    width: 100%;
    min-height: 100vh;
  }

  @media (max-width: 767px) {
    section:not(:first-child):not(#awards) {
      position: relative;
    }
  }
</style>
