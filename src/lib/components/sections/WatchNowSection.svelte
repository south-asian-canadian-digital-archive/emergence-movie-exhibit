<script lang="ts">
  import Section from "../Section.svelte";
  import SectionTitle from "../SectionTitle.svelte";
  import { IsMobile } from "$lib/hooks/is-mobile.svelte.ts";
  import Button from "$lib/components/ui/button/button.svelte";
  import { cn } from "$lib/utils";

  const isMobile = new IsMobile();

  interface VideoItem {
    title: string;
    videoId: string;
    url: string;
    description: string;
  }

  const videos: VideoItem[] = [
    {
      title: "Official Trailer",
      videoId: "VNjT3g1bf_Q",
      url: "https://youtu.be/VNjT3g1bf_Q",
      description:
        "Preview the journey of three South Asian LGBTQ+ individuals finding community and acceptance.",
    },
    {
      title: "Full Film (English Subtitles)",
      videoId: "LxWII2Cztlg",
      url: "https://youtu.be/LxWII2Cztlg",
      description:
        "Watch Emergence: Out of the Shadows in full with English subtitles.",
    },
    {
      title: "Full Film (French Subtitles)",
      videoId: "CLwEypQa5n0",
      url: "https://youtu.be/CLwEypQa5n0",
      description: "Experience the film with French subtitles.",
    },
    {
      title: "Full Film (Punjabi Subtitles)",
      videoId: "dG3NVW-iMyM",
      url: "https://youtu.be/dG3NVW-iMyM",
      description:
        "Watch the film with Punjabi subtitles for community screenings.",
    },
    {
      title: "Full Film (Hindi Subtitles)",
      videoId: "kw2_OV4gMvc",
      url: "https://youtu.be/kw2_OV4gMvc",
      description: "Watch the film with Hindi subtitles.",
    },
  ];

  let selectedVideoIndex = $state(0);

  const selectedVideo = $derived.by(() => videos[selectedVideoIndex]);

  const embedUrl = $derived.by(
    () =>
      `https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0&modestbranding=1&color=white`,
  );

  const textSizes = $derived({
    xs: isMobile.current ? "text-2xs" : "text-xs",
    sm: isMobile.current ? "text-xs" : "text-sm",
    base: isMobile.current ? "text-sm" : "text-base sm:text-lg md:text-xl",
    lg: isMobile.current ? "text-lg" : "text-xl",
  });

  let isPlaying = $state(false);

  function selectVideo(idx: number) {
    if (idx === selectedVideoIndex) return;
    selectedVideoIndex = idx;
    isPlaying = false;
  }

  function getThumbnail(videoId: string) {
    return `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
  }
</script>

<Section
  fillHeight={true}
  class="w-full {isMobile.current
    ? 'min-h-screen'
    : 'h-screen'} bg-gray-900 text-background {isMobile.current ? 'py-8' : ''}"
>
  <div class="h-full flex flex-col gap-6 md:gap-8 items-center justify-center">
    <SectionTitle title="Watch Now" color="text-background" />

    <div class="w-full max-w-5xl px-4">
      <div
        class="grid grid-cols-1 {isMobile.current
          ? 'gap-6'
          : 'md:grid-cols-5 gap-8'} items-start"
      >
        <div
          class="relative overflow-hidden rounded-xl bg-black/60 shadow-lg shadow-black/40 {isMobile.current
            ? ''
            : 'md:col-span-3'}"
        >
          <div class="relative w-full aspect-video group">
            {#if isPlaying}
              <iframe
                src={embedUrl + "&autoplay=1"}
                title={selectedVideo.title}
                width="1280"
                height="720"
                class="absolute inset-0 h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                referrerpolicy="strict-origin-when-cross-origin"
              ></iframe>
            {:else}
              <!-- Facade -->
              <button
                type="button"
                class="absolute inset-0 w-full h-full flex items-center justify-center bg-black/50 group-hover:bg-black/40 transition-colors cursor-pointer"
                onclick={() => (isPlaying = true)}
                aria-label="Play video"
              >
                <img
                  src={getThumbnail(selectedVideo.videoId)}
                  alt={selectedVideo.title}
                  class="absolute inset-0 w-full h-full object-cover -z-10"
                  loading="lazy"
                />
                <div
                  class="w-16 h-16 md:w-20 md:h-20 bg-primary/90 text-background rounded-full flex items-center justify-center pl-1 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:scale-110 transition-transform duration-300"
                >
                  <i class="fa-solid fa-play text-2xl md:text-3xl"></i>
                </div>
              </button>
            {/if}
          </div>
        </div>

        <div
          class="flex flex-col gap-3 md:gap-4 {isMobile.current
            ? ''
            : 'md:col-span-2'} text-pretty"
        >
          <h2
            class="font-[Bebas_Neue] uppercase tracking-[0.2em] {textSizes.lg}"
          >
            {selectedVideo.title}
          </h2>
          <p class="leading-relaxed text-muted-foreground {textSizes.sm}">
            {selectedVideo.description}
          </p>
          <Button
            variant="link"
            href="https://emergencefilm.net/videos/"
            class="justify-start px-0 text-background underline-offset-4 hover:underline"
            rel="noopener noreferrer"
            target="_blank"
          >
            Explore all viewing options
          </Button>
        </div>
      </div>
    </div>

    <div class="w-full max-w-5xl px-4">
      <p class="mb-3 text-center text-muted-foreground {textSizes.sm}">
        Hover or tap a version below to change the featured video.
      </p>
      <div
        class="grid {isMobile.current
          ? 'grid-cols-2 gap-3'
          : 'md:grid-cols-5 gap-4'}"
      >
        {#each videos as video, idx}
          <button
            type="button"
            aria-pressed={idx === selectedVideoIndex}
            aria-label={`Play ${video.title}`}
            onmouseenter={() => selectVideo(idx)}
            onfocus={() => selectVideo(idx)}
            onclick={() => selectVideo(idx)}
            class={cn(
              "group relative flex flex-col overflow-hidden rounded-lg border border-transparent bg-background/5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/60",
              idx === selectedVideoIndex
                ? "border-primary bg-primary/10"
                : "hover:border-primary/60 hover:bg-background/10",
            )}
          >
            <img
              src={getThumbnail(video.videoId)}
              alt={video.title}
              loading="lazy"
              width="320"
              height="180"
              class="h-full w-full object-cover"
            />
            <div
              class="relative z-10 flex flex-col gap-1 p-2 text-background/90 group-hover:text-background"
            >
              <span
                class="font-medium text-xs sm:text-sm uppercase tracking-[0.2em]"
              >
                {video.title}
              </span>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</Section>
