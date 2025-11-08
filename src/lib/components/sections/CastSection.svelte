<script lang="ts">
  import castData from "$lib/content/cast.json";
  import { Link, User } from "@lucide/svelte";
  import { withBase } from "$lib/utils";
  import SectionTitle from "../SectionTitle.svelte";
  import Section from "../Section.svelte";
  import { IsMobile } from "$lib/hooks/is-mobile.svelte.ts";

  const isMobile = new IsMobile();

  interface CastMember {
    name: string;
    bio: string;
    photo: string | null;
    photo_credits?: string;
    position: string;
    video?: string;
  }

  const castMembers: CastMember[] = castData.people;
  let selectedMember = $state(0);

  function selectMember(idx: number) {
    if (idx === selectedMember) return;
    selectedMember = idx;
  }

  // Derive responsive classes once
  const textSizes = $derived({
    xs: isMobile.current ? "text-2xs" : "text-xs",
    sm: isMobile.current ? "text-xs" : "text-sm",
    base: isMobile.current ? "text-sm" : "text-base sm:text-lg md:text-xl",
    lg: isMobile.current ? "text-lg" : "text-xl",
  });
</script>

<Section
  fillHeight={true}
  class="w-full {isMobile.current
    ? 'min-h-screen'
    : 'h-screen'} py-12 bg-background text-gray-900"
>
  <div class="h-full flex flex-col gap-4 items-center justify-center">
    <SectionTitle title="Cast & Crew" color="text-gray-900" />

    <!-- Main Showcase Section -->
    <div class="w-full max-w-4xl px-4">
      <div
        class="grid grid-cols-1 {isMobile.current
          ? 'gap-6'
          : 'md:grid-cols-5 gap-4'} items-center"
      >
        <div
          class="overflow-hidden flex justify-center {isMobile.current
            ? ''
            : 'md:col-span-3'}"
        >
          {#key selectedMember}
            {#if castMembers[selectedMember].photo}
              <img
                src={withBase(castMembers[selectedMember].photo)}
                alt={castMembers[selectedMember].name}
                class="w-full {isMobile.current
                  ? 'max-h-[30vh]'
                  : 'max-h-[40vh]'} object-cover aspect-video transition-transform duration-500 ease-out starting:scale-125"
              />
            {:else}
              <div
                class="w-full {isMobile.current
                  ? 'max-h-[30vh]'
                  : 'max-h-[40vh]'} aspect-video bg-gray-200 flex items-center justify-center transition-transform duration-500 ease-out starting:scale-125"
              >
                <User
                  class="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 text-gray-400"
                />
              </div>
            {/if}
          {/key}
        </div>

        <div
          class="space-y-2 sm:space-y-3 md:space-y-4 {isMobile.current
            ? ''
            : 'md:col-span-2'} ml-2 sm:ml-3 md:ml-4 text-pretty *:font-[Poppins] *:tracking-wider *:leading-tight"
        >
          <h2 class={textSizes.base}>
            {castMembers[selectedMember].name}
          </h2>
          <p class="leading-relaxed {textSizes.sm}">
            {castMembers[selectedMember].bio}
          </p>
          {#if castMembers[selectedMember].video}
            <a
              href={castMembers[selectedMember].video}
              class=" leading-tight flex items-center gap-1 {textSizes.xs} underline italic"
            >
              Meet {castMembers[selectedMember].name} in this video interview <Link
                size={12}
              />
            </a>
          {/if}
        </div>
      </div>
    </div>

    <!-- Production Company Section -->
    <p class="{textSizes.sm} text-gray-700 text-center px-4">
      <span class="font-medium">Production Company –</span>
      <span class="font-semibold text-gray-900">Sher Films</span>
      <span>(A Division of the Sher Vancouver LGBTQ Friends Society)</span>
    </p>

    <!-- Cast Grid Section -->
    <div class="w-full max-w-4xl px-4">
      <div
        class="grid {isMobile.current
          ? 'grid-cols-3 gap-3'
          : 'grid-cols-5 gap-2 sm:gap-3 max-h-[30vh]'}"
      >
        {#each castMembers as member, idx}
          <button
            onmouseenter={() => selectMember(idx)}
            onclick={() => selectMember(idx)}
            style="cursor: pointer;"
            class="group relative w-full rounded-lg sm:rounded-xl overflow-hidden bg-gray-100 {isMobile.current
              ? 'min-h-[12vh]'
              : ''}"
          >
            {#if member.photo}
              <img
                src={withBase(member.photo)}
                alt={member.name}
                class="w-full h-full object-cover"
              />
            {:else}
              <div
                class="w-full h-full bg-gray-200 flex items-center justify-center"
              >
                <User
                  class="{isMobile.current
                    ? 'w-8 h-8'
                    : 'w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8'} text-gray-500"
                />
              </div>
            {/if}

            <div
              class="absolute inset-0 bg-black/30 backdrop-blur flex items-end justify-end *:text-right p-1 sm:p-2 transition-opacity duration-300 {isMobile.current
                ? idx === selectedMember
                  ? 'opacity-0'
                  : 'opacity-100'
                : 'group-hover:opacity-0'}"
            >
              <p
                class="{isMobile.current
                  ? 'text-sm'
                  : 'text-xs sm:text-sm md:text-lg lg:text-xl xl:text-2xl'} font-bold text-white drop-shadow font-[Bebas_Neue] uppercase leading-none"
              >
                {member.name}
              </p>
            </div>
          </button>
        {/each}
      </div>
    </div>
  </div>
</Section>
