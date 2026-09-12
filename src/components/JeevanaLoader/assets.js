// Central manifest of assets the loader warms up before revealing the site.
// Critical assets must resolve (or time out / fail) before the loader may exit.
// Secondary assets are warmed in parallel and never block the reveal.

const brandLogo = '/navbarlogo.png'

// Weights approximate real-world impact (file size + visual importance) so the
// reported percentage tracks actual loading work instead of being a timer gimmick.
const criticalImages = [
  { src: brandLogo, weight: 10 },
  { src: '/newheronavbarlogo.png', weight: 8 },
  { src: '/Herosectionsvg.png', weight: 8 },
  { src: '/healthyretina.jpeg', weight: 5 },
  { src: '/subtlechanges.jpeg', weight: 5 },
  { src: '/progressionrisk.jpeg', weight: 5 },
  { src: '/potentialvisionimpact.jpeg', weight: 5 },
  { src: '/rural.png', weight: 6 },
]

const secondaryImages = [
  { src: '/beautifleyeslook.jpeg', weight: 4 },
  { src: '/grandcamview.jpeg', weight: 4 },
  { src: '/mitslogo.jpg', weight: 1 },
  { src: '/howitworks-1.jpeg', weight: 2 },
  { src: '/howitworks-2.jpeg', weight: 2 },
  { src: '/howitworks-3.jpeg', weight: 2 },
  { src: '/howitworks-4.jpeg', weight: 2 },
  { src: '/howitworks-5.jpeg', weight: 2 },
  { src: '/howitworks-6.jpeg', weight: 2 },
]

const heroVideo = { src: '/herovideo.mp4', weight: 22 }

const secondaryVideo = { src: '/meetjeevananetravideo.mp4' }

const allImages = [...criticalImages, ...secondaryImages]

const totalWeight = allImages.reduce((sum, item) => sum + item.weight, 0) + heroVideo.weight

export const ASSET_MANIFEST = {
  brandLogo,
  criticalImages,
  secondaryImages,
  allImages,
  heroVideo,
  secondaryVideo,
  totalWeight,
}