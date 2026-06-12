export const MEDIA_CDN = "https://pub-fab1140cac404905a5537d13579c2404.r2.dev"

export function mediaUrl(path: string): string {
  return `${MEDIA_CDN}/${path.replace(/^\//, "")}`
}

export const HERO_POSTER_URL = mediaUrl("foto-taina1.webp")

export const HERO_VIDEO_URL = mediaUrl("hero-home-v3.mp4")

export const FOTO_TAINA_1 = mediaUrl("foto-taina1.webp")
export const FOTO_TAINA_2 = mediaUrl("foto-taina2.webp")

const STORY_VIDEO_IDS = [
  1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 25, 26, 27, 28, 29,
] as const

export function storyVideoUrl(id: number): string {
  return mediaUrl(`story-${String(id).padStart(2, "0")}.mp4`)
}

export const STORY_VIDEOS = STORY_VIDEO_IDS.map((id) => ({
  id,
  type: "video" as const,
  url: storyVideoUrl(id),
}))

export const STORY_IMAGE_23 = {
  id: 23,
  type: "image" as const,
  url: mediaUrl("story-23.webp"),
}

export const INSTAGRAM_STORIES = [...STORY_VIDEOS, STORY_IMAGE_23].sort((a, b) => a.id - b.id)

/** Vídeos do carrossel em /por-que-particular (story-04 … story-29, exceto 05). */
export function porQueParticularStoryUrls(): string[] {
  const nums: number[] = []
  for (let n = 4; n <= 21; n++) {
    if (n !== 5) nums.push(n)
  }
  for (let n = 25; n <= 29; n++) nums.push(n)
  return nums.map(storyVideoUrl)
}
