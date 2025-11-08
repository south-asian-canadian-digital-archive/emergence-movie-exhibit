<script lang="ts">
  import { withBase } from "$lib/utils";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import Section from "$lib/components/Section.svelte";
  import SectionTitle from "$lib/components/SectionTitle.svelte";
  import emergence from "$lib/content/emergence.json";
  import { IsMobile } from "$lib/hooks/is-mobile.svelte.ts";

  const isMobile = new IsMobile();

  const stills = [
    withBase("/stills/Alex Still Photo (1).jpg"),
    withBase("/stills/alex-and-kayden-sitting-down-on-park-bench.webp"),
    withBase("/stills/alex-in-bed.webp"),
    withBase("/stills/Avtar and Rajwant Still Photo (1) (1).jpg"),
    withBase("/stills/emergence-finecut-flat.00_03_59_01.still095.jpg"),
    withBase("/stills/emergence-finecut-flat.00_29_59_19.still066.jpg"),
    withBase("/stills/emergence-finecut-flat.00_39_23_01.still056.jpg"),
    withBase("/stills/emergence-finecut-flat.00_52_15_14.still006.jpg"),
    withBase("/stills/emergence-finecut-flat.01_04_44_03.still014.jpg"),
    withBase("/stills/img_1888.webp"),
    withBase("/stills/Jaspal Still Photo (1).jpg"),
    withBase("/stills/Kayden Still Photo (1).jpg"),
    withBase("/stills/Rajwant and Jag Still Photo (1).jpg"),
    withBase("/stills/vinay-reading-script-notes.webp"),
  ];

  const awards = emergence.awardsHighlights;

  let currentAwardIndex = $state(0);
  let floatingImages: Array<{
    id: number;
    src: string;
    x: number;
    initialY: number;
    y: number; // dynamic y offset
    opacity: number;
    scale: number;
    isLoaded?: boolean;
  }> = $state([]);
  let imageCounter = 0;
  let imageContainer: HTMLElement;

  // Track which stills have finished loading
  const loadedSrcs = new Set<string>();
  let hasPreloaded = false;

  const preloadAllStills = () => {
    if (hasPreloaded || !browser) return;
    hasPreloaded = true;
    for (const src of stills) {
      const img = new Image();
      img.decoding = "async";
      img.src = src;
      img.onload = () => {
        loadedSrcs.add(src);
      };
      img.onerror = () => {
        // Keep going even if a particular image fails
      };
    }
  };

  // Preload on mount
  onMount(() => {
    preloadAllStills();
  });

  const getRandomStill = () => {
    const idx = Math.floor(Math.random() * stills.length);
    return stills[idx];
  };

  // Image creation throttle delay in milliseconds
  const IMAGE_CREATION_DELAY = 300;

  const addFloatingImage = (x: number, y: number) => {
    const src = getRandomStill();
    const newImage = {
      id: imageCounter++,
      src,
      x: x - 100, // Center the image on cursor
      initialY: y - 100, // Store the initial Y position
      y: 0, // Start with no scroll offset
      opacity: 0,
      scale: 0.5, // Start smaller for more dramatic effect
      isLoaded: loadedSrcs.has(src),
    };

    floatingImages = [...floatingImages, newImage];
    console.log("Created new image:", newImage, "at position:", x, y);

    // Animate in only if already loaded; otherwise wait for onload handler
    if (newImage.isLoaded) {
      requestAnimationFrame(() => {
        const index = floatingImages.findIndex((img) => img.id === newImage.id);
        if (index !== -1) {
          floatingImages[index].opacity = 1;
          floatingImages[index].scale = 1;
          floatingImages = [...floatingImages];
          console.log("Animated in image (preloaded):", floatingImages[index]);
        }
      });
    }

    // Remove after delay
    setTimeout(
      () => {
        removeImage(newImage.id);
      },
      1500 + Math.random() * 800 // Faster removal timing
    );
  };

  const removeImage = (id: number) => {
    const index = floatingImages.findIndex((img) => img.id === id);
    if (index !== -1) {
      floatingImages[index].opacity = 0;
      floatingImages[index].scale = 0.5;
      floatingImages = [...floatingImages];
      setTimeout(() => {
        floatingImages = floatingImages.filter((img) => img.id !== id);
      }, 150);
    }
  };

  const handleImageLoad = (id: number, src: string) => {
    loadedSrcs.add(src);
    const index = floatingImages.findIndex((img) => img.id === id);
    if (index !== -1) {
      floatingImages[index].isLoaded = true;
      floatingImages[index].opacity = 1;
      floatingImages[index].scale = 1;
      floatingImages = [...floatingImages];
      console.log("Animated in image (onload):", floatingImages[index]);
    }
  };

  // Handle pointer events for floating images
  let lastImageTime = 0;
  const handlePointerEvent = (e: MouseEvent | PointerEvent) => {
    if (!imageContainer) return;

    const rect = imageContainer.getBoundingClientRect();
    const clientX = e.clientX;
    const clientY = e.clientY;

    // Update cursor position for scroll-generated images
    lastCursorX = clientX - rect.left;
    lastCursorY = clientY - rect.top;

    const now = Date.now();
    if (now - lastImageTime > IMAGE_CREATION_DELAY) {
      addFloatingImage(lastCursorX, lastCursorY);
      lastImageTime = now;
    }
  };

  // Export function to update award index from parent
  export function updateAwardIndex(index: number) {
    if (index >= 0 && index < awards.length) {
      currentAwardIndex = index;
    }
  }

  let lastScrollProgress = 0;
  let lastScrollY = 0;
  export function updateScrollProgress(progress: number) {
    // Only create an image if scroll progress has changed enough (e.g., by 0.01)
    if (Math.abs(progress - lastScrollProgress) > 0.01) {
      createScrollImages();
      lastScrollProgress = progress;
    }
    // Calculate scroll delta in px (simulate 1000px scroll range)
    const currentY = progress * 1000;
    const deltaY = lastScrollY - currentY; // invert direction
    if (deltaY !== 0) {
      floatingImages = floatingImages.map((img) => ({
        ...img,
        y: img.y + deltaY * 8,
      }));
    }
    lastScrollY = currentY;
  }

  let lastCursorX = 0;
  let lastCursorY = 0;

  let lastScrollImageTime = 0;
  const createScrollImages = () => {
    if (!imageContainer || lastCursorX === 0 || lastCursorY === 0) return;

    const now = Date.now();
    if (now - lastScrollImageTime > IMAGE_CREATION_DELAY) {
      addFloatingImage(lastCursorX, lastCursorY);
      lastScrollImageTime = now;
    }
  };
</script>

<div
  class="relative w-full {isMobile.current
    ? 'min-h-screen'
    : 'h-screen'} overflow-hidden rounded-t-2xl!"
>
  <SectionTitle title="Awards" color="text-background" />

  <Section
    class="relative w-full {isMobile.current
      ? 'min-h-screen'
      : 'h-screen'} bg-gray-900 text-background flex items-center rounded-t-2xl {isMobile.current
      ? 'overflow-y-auto py-8'
      : ''}"
  >
    <div
      class="flex h-full w-full {isMobile.current
        ? 'flex-col'
        : 'flex-col md:flex-row'} rounded-t-2xl px-4"
    >
      <div
        class="w-full {isMobile.current
          ? ''
          : 'md:w-1/2'} flex flex-col justify-center items-start z-10 space-y-4"
      >
        {#if awards[currentAwardIndex]}
          {@const award = awards[currentAwardIndex]}

          <span
            class="px-3 md:px-4 py-2 bg-primary text-primary-foreground rounded-full {isMobile.current
              ? 'text-xs'
              : 'text-xs md:text-sm'} font-semibold inline-flex items-center w-fit"
          >
            {award.result}
          </span>

          <h3
            class="{isMobile.current
              ? 'text-xl'
              : 'text-2xl md:text-3xl'} font-bold leading-tight"
          >
            {award.title}
          </h3>

          <p
            class="{isMobile.current
              ? 'text-base'
              : 'text-lg md:text-xl'} text-gray-300"
          >
            {award.festival}
          </p>

          <p class="{isMobile.current ? 'text-xs' : 'text-sm'} text-gray-400">
            {new Date(award.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>

          <div class="flex items-center gap-2 w-full max-w-md">
            <span class="text-sm text-gray-400 whitespace-nowrap">
              {currentAwardIndex + 1} of {awards.length}
            </span>
            <div class="relative flex-1 h-1 bg-muted rounded">
              <div
                class="h-full bg-primary rounded transition-all duration-300"
                style="width: {((currentAwardIndex + 1) / awards.length) *
                  100}%"
              ></div>
            </div>
          </div>
        {/if}
      </div>
    </div>
  </Section>

  <div
    bind:this={imageContainer}
    class="absolute inset-0 w-full h-full rounded-t-2xl"
    onmousemove={handlePointerEvent}
    onpointermove={handlePointerEvent}
    role="presentation"
    aria-hidden="true"
    style="cursor: {isMobile.current
      ? 'default'
      : 'none'}; pointer-events: auto;"
  >
    {#each floatingImages as image (image.id)}
      <img
        src={image.src}
        alt="Movie still"
        decoding="async"
        class="absolute aspect-video {isMobile.current
          ? 'w-[40vw]'
          : 'w-[50vw] md:w-[22vw]'} object-cover shadow-lg pointer-events-none transition-all duration-150 ease-out z-0"
        style="
            left: {image.x}px;
            top: {image.initialY + image.y}px;
            opacity: {image.opacity};
            transform: scale({image.scale});
          "
        onload={() => handleImageLoad(image.id, image.src)}
        onerror={() => removeImage(image.id)}
      />
    {/each}

    <div
      class="absolute inset-0 z-10 flex items-center justify-center pointer-events-none rounded-t-2xl"
    >
      <p
        class="text-background/30 {isMobile.current
          ? 'text-sm'
          : 'text-base md:text-lg'} font-light tracking-wide text-right px-4 rounded-t-2xl {isMobile.current
          ? 'pl-4'
          : 'pl-[50vw]'}"
      >
        <span class="hidden md:inline">Move your cursor to reveal stills</span>
        <span class="md:hidden">Tap to reveal stills</span>
      </p>
    </div>
  </div>
</div>
