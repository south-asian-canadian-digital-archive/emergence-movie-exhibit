<script lang="ts">
  import "../app.css";
  import { onMount, onDestroy } from "svelte";
  import { fade, fly } from "svelte/transition";
  import { gsap } from "gsap";
  import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
  import { withBase } from "$lib/utils";

  import {
    Header,
    Footer,
  } from "@south-asian-canadian-digital-archive/sacda-exhibits-common";

  import SubHeader from "$lib/components/SubHeader.svelte";
  import SubFooter from "$lib/components/SubFooter.svelte";
  import Cursor from "$lib/components/Cursor.svelte";
  import SkipLink from "$lib/components/SkipLink.svelte";

  import shareThis, { type ShareThisInstance } from "share-this";
  import * as twitterSharer from "share-this/dist/sharers/twitter";
  import * as redditSharer from "share-this/dist/sharers/reddit";
  import * as facebookSharer from "share-this/dist/sharers/facebook";
  import * as emailSharer from "share-this/dist/sharers/email";

  interface Props {
    children?: import("svelte").Snippet;
  }

  let scrollY = $state(0);
  let { children }: Props = $props();

  let firstLoad = $state(true);
  // let load = $derived(firstLoad || !$navigating);

  const siteData = {
    description: "",
    keywords: [
      "Emergence: Out of the Shadows",
      "Documentary",
      "LGBTQ+",
      "South Asian",
      "Queer",
      "Coming Out",
      "Punjabi",
      "Sikh",
      "Family",
      "Acceptance",
      "Tradition",
      "Taboo",
      "Healing",
      "Compassion",
      "Kayden",
      "Jag",
      "Amar",
      "Film",
      "Movie",
      "Exhibit",
    ],
    placename: "British Columbia, Canada",
    region: "British Columbia, Canada",
  };

  let selectionShare: ShareThisInstance | undefined = $state();

  onMount(() => {
    gsap.registerPlugin(ScrollToPlugin);
    // gsap.registerPlugin(ScrollTrigger);

    selectionShare = shareThis({
      selector: "#main-content",
      popoverClass: "custom-share-popover",
      sharers: [twitterSharer, facebookSharer, redditSharer, emailSharer],
    });

    selectionShare.init();

    // ScrollTrigger.create({
    //   trigger: "#subheader",
    //   pin: true,
    //   start: "top",
    //   end: "max",
    //   pinType: "fixed",
    //   pinSpacing: false,
    // });

    firstLoad = false;
  });

  onDestroy(() => {
    selectionShare?.destroy();
  });
</script>

<svelte:head>
  <!-- Open Graph / Facebook Meta Tags - MUST be first for crawler compatibility -->
  <meta property="og:url" content="https://sacda.ca/exhibits/emergence/" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Emergence: Out of the Shadows | SACDA" />
  <meta
    property="og:description"
    content="For Kayden, Jag, and Amar, awakening to and expressing their sexuality within conservative South Asian families was a lonely and terrifying experience. Heart-wrenching and healing, their distinct coming-out paths offer comfort, compassion, and inspiration to individuals and communities struggling with acceptance."
  />
  <meta
    property="og:image"
    content="https://test.sacda.ca/exhibits/emergence/poster.jpg"
  />

  <!-- Twitter Meta Tags -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta property="twitter:domain" content="sacda.ca" />
  <meta property="twitter:url" content="https://sacda.ca/exhibits/emergence/" />
  <meta name="twitter:title" content="Emergence: Out of the Shadows | SACDA" />
  <meta
    name="twitter:description"
    content="For Kayden, Jag, and Amar, awakening to and expressing their sexuality within conservative South Asian families was a lonely and terrifying experience. Heart-wrenching and healing, their distinct coming-out paths offer comfort, compassion, and inspiration to individuals and communities struggling with acceptance."
  />
  <meta
    name="twitter:image"
    content="https://test.sacda.ca/exhibits/emergence/poster.jpg"
  />

  <!-- HTML Meta Tags -->
  <title>Emergence: Out of the Shadows | SACDA</title>
  <meta
    name="description"
    content="For Kayden, Jag, and Amar, awakening to and expressing their sexuality within conservative South Asian families was a lonely and terrifying experience. Heart-wrenching and healing, their distinct coming-out paths offer comfort, compassion, and inspiration to individuals and communities struggling with acceptance."
  />
  <meta name="author" content="South Asian Canadian Digital Archive" />
  <meta name="geo.placename" content={siteData.placename} />
  <meta name="geo.region" content={siteData.region} />
  <meta name="apple-mobile-web-app-title" content="SACDA Exhibit" />
  <meta name="keywords" content={siteData.keywords.join(", ")} />
  <link rel="canonical" href="https://sacda.ca/exhibits/emergence/" />
  <meta name="robots" content="index, follow" />
  <meta property="og:locale" content="en_CA" />

  <!-- LCP Preload -->
  <link
    rel="preload"
    as="image"
    href={withBase("/stills/Kayden Still Photo (1).jpg")}
    fetchpriority="high"
  />

  <!-- Favicons -->
  <link
    rel="icon"
    type="image/png"
    href={withBase("/favicon-32x32.png")}
    sizes="32x32"
  />
  <link
    rel="icon"
    type="image/png"
    href={withBase("/logo.png")}
    sizes="192x192"
  />

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link
    rel="preconnect"
    href="https://fonts.gstatic.com"
    crossorigin="anonymous"
  />
  <link
    href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
    rel="stylesheet"
  />

  <!-- FontAwesome -->
  <script
    src="https://kit.fontawesome.com/30f055fc02.js"
    crossorigin="anonymous"
    defer
  ></script>

  <!-- Structured Data (JSON-LD) -->
  {@html `<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Movie",
        "@id": "https://sacda.ca/exhibits/emergence/#movie",
        "name": "Emergence: Out of the Shadows",
        "alternateName": "Emergence",
        "description": "For Kayden, Jag, and Amar, awakening to and expressing their sexuality within conservative South Asian families was a lonely and terrifying experience. Heart-wrenching and healing, their distinct coming-out paths offer comfort, compassion, and inspiration to individuals and communities struggling with acceptance.",
        "dateCreated": "2021",
        "genre": ["Documentary", "LGBTQ+", "Drama"],
        "inLanguage": ["en", "pa", "hi"],
        "director": {
          "@type": "Person",
          "name": "Vinay Giridhar"
        },
        "productionCompany": {
          "@type": "Organization",
          "name": "Sher Films",
          "parentOrganization": {
            "@type": "Organization",
            "name": "Sher Vancouver LGBTQ Friends Society"
          }
        },
        "duration": "PT81M",
        "image": "https://sacda.ca/exhibits/emergence/poster.jpg",
        "trailer": {
          "@type": "VideoObject",
          "name": "Emergence: Out of the Shadows - Official Trailer",
          "description": "Official trailer for the documentary Emergence: Out of the Shadows",
          "thumbnailUrl": "https://img.youtube.com/vi/VNjT3g1bf_Q/maxresdefault.jpg",
          "uploadDate": "2021-09-01",
          "embedUrl": "https://www.youtube.com/embed/VNjT3g1bf_Q"
        },
        "aggregateRating": {
          "@type": "AggregateRating",
          "ratingValue": "4.8",
          "bestRating": "5",
          "ratingCount": "51"
        },
        "award": [
          "Best Documentary - Vancouver International South Asian Film Festival",
          "Christopher Marlowe Award for Best Documentary Feature Film - San Antonio QFest",
          "Best Film Award - Championing Change - UK Asian Film Festival",
          "Academy Award Qualifying - Out On Film Atlanta",
          "BAFTA Qualifying - Frameline San Francisco"
        ]
      },
      {
        "@type": "WebPage",
        "@id": "https://sacda.ca/exhibits/emergence/",
        "url": "https://sacda.ca/exhibits/emergence/",
        "name": "Emergence: Out of the Shadows | SACDA",
        "description": "A powerful documentary exploring LGBTQ+ stories in South Asian communities. Watch the award-winning film about courage, family, and acceptance.",
        "isPartOf": {
          "@type": "WebSite",
          "name": "South Asian Canadian Digital Archive",
          "url": "https://sacda.ca"
        },
        "mainEntity": {
          "@id": "https://sacda.ca/exhibits/emergence/#movie"
        }
      },
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "SACDA",
            "item": "https://sacda.ca"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": "Exhibits",
            "item": "https://sacda.ca/exhibits"
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": "Emergence: Out of the Shadows",
            "item": "https://sacda.ca/exhibits/emergence/"
          }
        ]
      },
      {
        "@type": "Organization",
        "@id": "https://sacda.ca/#organization",
        "name": "South Asian Canadian Digital Archive",
        "url": "https://sacda.ca",
        "logo": "https://sacda.ca/logo.png"
      }
    ]
  }
  </script>`}
</svelte:head>

<svelte:window bind:scrollY />

<SkipLink />
<Cursor />

<div class="h-full w-full">
  <Header />

  <SubHeader />

  <div
    class="-mt-16 mb-[400px] overflow-x-clip overflow-y-clip"
    id="main-content"
  >
    {@render children?.()}
  </div>

  <div class="fixed bottom-0 z-[-1] w-full">
    <SubFooter />
    <Footer />
  </div>
</div>

<!-- Floating Play Button -->
<button
  class="group w-fit fixed left-2 md:left-auto md:right-6 z-[9999] rounded-full bg-red-500 object-cover py-0.5 shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-red-700"
  class:bottom-6={scrollY === 0}
  class:bottom-22={scrollY !== 0}
  aria-label="Watch Now"
  onclick={(e) => {
    e.preventDefault();
    const targetVh = 210;
    const targetPx = Math.round((targetVh / 100) * window.innerHeight); // 200vh => 2 * innerHeight

    gsap.to(window, {
      duration: 1,
      scrollTo: {
        y: targetPx,
        autoKill: false,
      },
      ease: "power2.inOut",
    });
  }}
>
  <span
    class="fa fa-play px-5 py-4 text-white transition-all duration-500 group-hover:scale-110"
  ></span>
</button>

{#if scrollY !== 0}
  <button
    transition:fly={{ y: 10, duration: 500 }}
    class="group w-fit fixed bottom-6 left-2 md:left-auto md:right-6 z-[9999] rounded-full bg-[#f49d2d] object-cover py-0.5 shadow-lg transition-all duration-500 hover:-translate-y-1"
    aria-label="Scroll to top"
    onclick={() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }}
  >
    <span
      class="fa fa-angle-left rotate-90 px-5 py-4 text-white transition-all duration-500 group-hover:scale-110"
    ></span>
  </button>
{/if}
