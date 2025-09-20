# Images Directory

This directory contains static images and assets for the project.

## Structure

- `/icons/` - SVG icons and small graphics
- `/photos/` - Photographs and large images
- `/logos/` - Brand logos and identity assets

## Usage

Images in this directory can be accessed directly via URL:
- `/images/icons/whatsapp.svg`
- `/images/logos/brand.png`
- etc.

Or imported in components:
```jsx
import Image from 'next/image'

<Image 
  src="/images/icons/whatsapp.svg" 
  alt="WhatsApp" 
  width={24} 
  height={24} 
/>
```
