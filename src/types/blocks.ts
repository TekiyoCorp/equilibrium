import type { Media } from '@/payload-types'

// Types de base pour tous les blocs
export type BaseBlock = {
  blockType: string
  id?: string
}

// Types spécifiques pour chaque bloc
export type MediaCardSliderBlock = BaseBlock & {
  blockType: 'mediaCardSlider'
  title?: string | null
  items: Array<{
    image: Media | number
    text?: string | null
  }>
}

export type CourseCardsBlock = BaseBlock & {
  blockType: 'courseCards'
  title?: string | null
  items: Array<{
    title?: string | null
    description?: string | null
    image?: Media | number | null
    href?: string | null
  }>
  button?: Array<{
    label: string
    href: string
    linkType?: 'url' | 'page'
    page?: Media | number | null
    variant?: 'primary' | 'secondary' | 'ghost'
    target?: '_self' | '_blank'
    fullWidth?: boolean
    ariaLabel?: string
  }>
}

export type OverlayFeatureSectionBlock = BaseBlock & {
  blockType: 'overlayFeatureSection'
  overlayWord?: string | null
  backgroundImage?: Media | number | null
  heading?: string | null
  button?: Array<{
    label: string
    href: string
    linkType?: 'url' | 'page'
    page?: Media | number | null
    variant?: 'primary' | 'secondary' | 'ghost'
    target?: '_self' | '_blank'
    fullWidth?: boolean
    ariaLabel?: string
  }>
  items?: Array<{
    title?: string | null
    description?: string | null
  }>
}

export type DetailedCourseGridBlock = BaseBlock & {
  blockType: 'detailedCourseGrid'
  title?: string | null
  items: Array<{
    title?: string | null
    description?: string | null
    image?: Media | number | null
    href?: string | null
  }>
}

export type TextMediaTilesBlock = BaseBlock & {
  blockType: 'textMediaTiles'
  items: Array<{
    title?: string | null
    description?: string | null
    image?: Media | number | null
  }>
}

export type TextImageBlockBlock = BaseBlock & {
  blockType: 'textImageBlock'
  text?: string | null
  subtitle?: string | null
  image?: Media | number | null
}

export type ConceptSectionBlock = BaseBlock & {
  blockType: 'conceptSection'
  title?: string | null
  subtitle?: string | null
  backgroundImage?: Media | number | null
  button?: Array<{
    label: string
    href: string
    linkType?: 'url' | 'page'
    page?: Media | number | null
    variant?: 'primary' | 'secondary' | 'ghost'
    target?: '_self' | '_blank'
    fullWidth?: boolean
    ariaLabel?: string
  }>
}

export type NewConceptSectionBlock = BaseBlock & {
  blockType: 'newConceptSection'
  title?: string | null
  subtitle?: string | null
  backgroundImage?: Media | number | null
  button?: Array<{
    label: string
    href: string
    linkType?: 'url' | 'page'
    page?: Media | number | null
    variant?: 'primary' | 'secondary' | 'ghost'
    target?: '_self' | '_blank'
    fullWidth?: boolean
    ariaLabel?: string
  }>
}

export type FaqSectionBlock = BaseBlock & {
  blockType: 'faqSection'
  title?: string | null
  items: Array<{
    question?: string | null
    answer?: string | null
  }>
}

export type CoachesGridBlock = BaseBlock & {
  blockType: 'coachesGrid'
  title?: string | null
  subtitle?: string | null
  items: Array<{
    name?: string | null
    image?: Media | number | null
    href?: string | null
    page?: Media | number | null
  }>
}

export type LocationBlock = BaseBlock & {
  blockType: 'location'
  title?: string | null
  subtitle?: string | null
  locations?: Array<{
    name: string
    address: string
    coordinates: [number, number]
    schedule: {
      weekdays: string
      weekends: string
    }
  }>
}

export type ChatSectionBlock = BaseBlock & {
  blockType: 'chatSection'
  title?: string | null
  subtitle?: string | null
  whatsappNumber?: string | null
  whatsappIcon?: Media | number | null
}

export type ConceptIconsSectionBlock = BaseBlock & {
  blockType: 'conceptIconsSection'
  title?: string | null
  items: Array<{
    icon?: Media | number | null
    title?: string | null
    description?: string | null
  }>
}

export type ButtonBlock = BaseBlock & {
  blockType: 'button'
  label: string
  href: string
  linkType?: 'url' | 'page'
  page?: Media | number | null
  variant?: 'primary' | 'secondary' | 'ghost'
  target?: '_self' | '_blank'
  fullWidth?: boolean
  ariaLabel?: string
}

// Union type pour tous les blocs
export type Block =
  | MediaCardSliderBlock
  | CourseCardsBlock
  | OverlayFeatureSectionBlock
  | DetailedCourseGridBlock
  | TextMediaTilesBlock
  | TextImageBlockBlock
  | ConceptSectionBlock
  | NewConceptSectionBlock
  | FaqSectionBlock
  | CoachesGridBlock
  | LocationBlock
  | ChatSectionBlock
  | ConceptIconsSectionBlock
  | ButtonBlock

// Type guards pour vérifier le type de bloc
export function isMediaCardSliderBlock(block: Block): block is MediaCardSliderBlock {
  return block.blockType === 'mediaCardSlider'
}

export function isCourseCardsBlock(block: Block): block is CourseCardsBlock {
  return block.blockType === 'courseCards'
}

export function isOverlayFeatureSectionBlock(block: Block): block is OverlayFeatureSectionBlock {
  return block.blockType === 'overlayFeatureSection'
}

export function isDetailedCourseGridBlock(block: Block): block is DetailedCourseGridBlock {
  return block.blockType === 'detailedCourseGrid'
}

export function isTextMediaTilesBlock(block: Block): block is TextMediaTilesBlock {
  return block.blockType === 'textMediaTiles'
}

export function isTextImageBlockBlock(block: Block): block is TextImageBlockBlock {
  return block.blockType === 'textImageBlock'
}

export function isConceptSectionBlock(block: Block): block is ConceptSectionBlock {
  return block.blockType === 'conceptSection'
}

export function isNewConceptSectionBlock(block: Block): block is NewConceptSectionBlock {
  return block.blockType === 'newConceptSection'
}

export function isFaqSectionBlock(block: Block): block is FaqSectionBlock {
  return block.blockType === 'faqSection'
}

export function isCoachesGridBlock(block: Block): block is CoachesGridBlock {
  return block.blockType === 'coachesGrid'
}

export function isLocationBlock(block: Block): block is LocationBlock {
  return block.blockType === 'location'
}

export function isChatSectionBlock(block: Block): block is ChatSectionBlock {
  return block.blockType === 'chatSection'
}

export function isConceptIconsSectionBlock(block: Block): block is ConceptIconsSectionBlock {
  return block.blockType === 'conceptIconsSection'
}

export function isButtonBlock(block: Block): block is ButtonBlock {
  return block.blockType === 'button'
}
