# Hedera CommunEA Design System

## Brand Colors

Hedera's official brand colors are used throughout the application to maintain consistency and brand recognition:

### Primary Colors
- **Hedera Green**: `#00D4AA` - Main brand color, used for primary actions and highlights
- **Hedera Blue**: `#00A3FF` - Secondary brand color, used for links and accents
- **Dark Background**: `#1A1A1A` - Primary background color for dark theme
- **White**: `#FFFFFF` - Text and light elements

### Extended Palette
- **Success Green**: `#10B981` - Success states and confirmations
- **Warning Yellow**: `#F59E0B` - Warning states and notifications
- **Error Red**: `#EF4444` - Error states and alerts
- **Purple Accent**: `#8B5CF6` - Secondary accents and gradients
- **Pink Accent**: `#EC4899` - Tertiary accents and highlights

## Color Usage Guidelines

### Primary Actions
- Background: `bg-[#00D4AA]` or `bg-hedera-green`
- Hover: `hover:bg-[#00A3FF]` or `hover:bg-hedera-blue`
- Text: `text-[#00D4AA]` or `text-hedera-green`

### Secondary Actions
- Background: `bg-[#00A3FF]/10` (transparent)
- Border: `border-[#00A3FF]/30`
- Text: `text-[#00A3FF]`

### Backgrounds
- Primary: `bg-[#1A1A1A]` (dark theme)
- Secondary: `bg-[#1A1A1A]/80` with `backdrop-blur-md`
- Accent: `bg-[#00D4AA]/5` for subtle highlights

### Text Colors
- Primary: `text-white`
- Secondary: `text-gray-300`
- Muted: `text-gray-400`
- Brand: `text-[#00D4AA]`

## Typography

### Font Families
- **Primary**: Inter (sans-serif) - Used for body text and UI elements
- **Headings**: Inter (sans-serif) - Used for headings and titles

### Font Sizes
- **Hero**: `text-5xl md:text-7xl` (3.5rem - 4.5rem)
- **H1**: `text-4xl md:text-5xl` (2.25rem - 3rem)
- **H2**: `text-3xl md:text-4xl` (1.875rem - 2.25rem)
- **H3**: `text-2xl md:text-3xl` (1.5rem - 1.875rem)
- **Body Large**: `text-xl` (1.25rem)
- **Body**: `text-base` (1rem)
- **Body Small**: `text-sm` (0.875rem)

## Spacing

### Section Spacing
- **Hero Section**: `min-h-screen` with `py-20` padding
- **Content Sections**: `py-20` top/bottom padding
- **Component Spacing**: `mb-16` between major elements
- **Element Spacing**: `mb-8` for headings, `mb-6` for subheadings

### Grid Layouts
- **Container**: `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`
- **Grid Patterns**:
  - 1 column: `grid-cols-1`
  - 2 columns: `md:grid-cols-2`
  - 3 columns: `md:grid-cols-2 lg:grid-cols-3`
  - 4 columns: `md:grid-cols-2 lg:grid-cols-4`

## Components

### Buttons
```tsx
// Primary Button
<button className="px-8 py-4 bg-[#00D4AA] text-white font-semibold rounded-xl hover:bg-[#00A3FF] transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-[#00D4AA]/25">
  Primary Action
</button>

// Secondary Button
<button className="px-8 py-4 border border-[#00D4AA]/30 text-[#00D4AA] font-semibold rounded-xl hover:bg-[#00D4AA]/10 transition-all duration-300">
  Secondary Action
</button>
```

### Cards
```tsx
<div className="bg-[#1A1A1A]/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 hover:bg-[#1A1A1A]/70 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#00D4AA]/10">
  Card Content
</div>
```

### Navigation
```tsx
<nav className="text-gray-300 hover:text-[#00D4AA] transition-colors">
  Navigation Link
</nav>
```

## Responsive Design

### Breakpoints
- **Mobile**: Default (320px - 767px)
- **Tablet**: `md:` (768px - 1023px)
- **Desktop**: `lg:` (1024px - 1279px)
- **Large Desktop**: `xl:` (1280px+)

### Mobile-First Approach
- Base styles for mobile devices
- Progressive enhancement for larger screens
- Touch targets minimum 44px
- Readable font sizes on small screens

## Accessibility

### Color Contrast
- Text on dark backgrounds: WCAG AA compliant
- Focus indicators: Visible focus rings
- Color not used as only indicator of state

### Navigation
- Keyboard navigation support
- Screen reader friendly
- Skip links for main content
- ARIA labels where needed

## Animation & Transitions

### Duration
- **Fast**: `duration-200` (200ms)
- **Normal**: `duration-300` (300ms)
- **Slow**: `duration-500` (500ms)

### Easing
- **Default**: `ease-out` for smooth transitions
- **Bounce**: `ease-bounce` for playful elements

### Hover Effects
- Scale transforms: `hover:scale-105`
- Shadow effects: `hover:shadow-lg`
- Color transitions: Smooth color changes

## Icons & Imagery

### Icon Usage
- Consistent emoji usage for simplicity
- SVG icons for complex graphics
- Consistent sizing: `w-6 h-6` for small, `w-12 h-12` for large

### Images
- Optimized for web delivery
- Responsive sizing
- Alt text for accessibility
- Lazy loading where appropriate

## Implementation Notes

### Tailwind Configuration
Add Hedera colors to `tailwind.config.js`:
```js
module.exports = {
  theme: {
    extend: {
      colors: {
        'hedera-green': '#00D4AA',
        'hedera-blue': '#00A3FF',
        'hedera-dark': '#1A1A1A',
      }
    }
  }
}
```

### CSS Custom Properties
```css
:root {
  --hedera-green: #00D4AA;
  --hedera-blue: #00A3FF;
  --hedera-dark: #1A1A1A;
}
```

This design system ensures consistent branding and user experience across all Hedera CommunEA touchpoints while maintaining the professional, modern aesthetic appropriate for a Web3 platform.