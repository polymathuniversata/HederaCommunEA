# Project Structure Documentation

## Overview
This document outlines the current directory structure for Hedera CommunEA, implemented as of October 29, 2025. The project follows a clear separation of concerns with main category directories for better maintainability and scalability.

## Directory Structure

```
HederaCommunEA/
├── frontend/          # Next.js React application
├── backend/           # Node.js Express API server
├── blockchain/        # Hedera-related utilities (future)
├── docs/             # Documentation and guides
└── tools/            # Development tools and utilities
```

## Main Category Directories

### frontend/
- **Purpose**: Contains the Next.js React application for the user interface
- **Technologies**: Next.js 16, TypeScript 5, React 19, Material-UI v7, Tailwind CSS v4
- **Structure**:
  - `src/app/`: Next.js App Router pages and layouts
    - `page.tsx`: Main landing page with Material Design 3 components
    - `layout.tsx`: Root layout with global styles
    - `globals.css`: Global CSS with Tailwind imports
  - `src/components/`: Reusable React components with Material Design 3 variants
    - `NavigationM3.tsx`: M3-styled navigation with mobile menu
    - `HeroSectionM3.tsx`: Hero section with M3 theming
    - `FeaturesSectionM3.tsx`: Features showcase with M3 components
    - `WalletConnect.tsx`: Wallet connection interface
    - `UserDashboard.tsx`: Account dashboard with real-time data
  - `src/contexts/`: React Context providers
    - `WalletContext.tsx`: Wallet state management with manual account entry
  - `src/hooks/`: Custom React hooks
    - `useSmoothScroll.ts`: Smooth scrolling functionality
  - `src/theme/`: Material Design 3 theme system
    - `materialDesign3.ts`: Comprehensive M3 theme with Hedera branding
    - `designSystem.ts`: Design tokens and utilities
    - `accessibility.ts`: Accessibility utilities
    - `componentEnhancements.ts`: Component-specific styling
  - `public/`: Static assets
  - `package.json`: Frontend dependencies and scripts
  - `tsconfig.json`: TypeScript configuration
  - `next.config.ts`: Next.js configuration with Turbopack

### backend/
- **Purpose**: Contains the Node.js Express API server for business logic
- **Technologies**: Node.js, Express v5.1.0, Hedera SDK v2.75.0
- **Structure**:
  - `server.js`: Main Express server with API routes and security middleware
  - `package.json`: Backend dependencies and scripts
  - Hedera SDK integration for HTS token operations
  - CORS configuration for frontend communication
  - Input validation and error handling

### blockchain/
- **Purpose**: Contains Hedera blockchain integration scripts, smart contracts, and related utilities
- **Technologies**: Hedera SDK, Solidity (future)
- **Structure**: Currently empty, will contain HTS scripts and smart contracts

### docs/
- **Purpose**: Contains all project documentation, guides, and specifications
- **Contents**:
  - Project documentation (.md files)
  - ContextEngineeringGuide-main/ (reference guide)
  - Planning and specification documents
  - Deployment and testing guides
  - Team documentation and sprint plans

### tools/
- **Purpose**: Contains development tools, scripts, and utilities
- **Contents**: Currently empty, will contain build scripts, deployment tools, etc.

## Current Implementation Status (October 29, 2025)

### ✅ Completed Components

#### Frontend (Next.js 16 + TypeScript 5 + Material-UI v7 + Tailwind CSS v4)
- **Material Design 3 Theme System**: Complete M3 implementation with Hedera color palette
- **Modern Landing Page**: One-page design with Eastern Africa focus using M3 components
- **Token Creation Form**: Integrated glassmorphism UI with validation
- **Wallet Authentication**: Manual account ID entry with connection state management
- **User Dashboard**: Account overview with balances, token holdings, and activity tracking
- **Responsive Design**: Mobile-first approach for East African users
- **Production Build**: Optimized for Vercel deployment with Turbopack

#### Backend (Node.js + Express v5.1.0)
- **HTS Token Factory**: Full token creation with Hedera SDK v2.75.0
- **Production Security**: CORS, headers, logging middleware
- **Input Validation**: Comprehensive error handling and sanitization
- **API Endpoints**: `/create-token`, `/prepare-token`, and `/health` endpoints
- **Wallet Signing Integration**: Support for signed transactions from frontend

#### Deployment Configuration
- **Vercel Frontend**: Production-ready configuration with environment variables
- **Render Backend**: Production-ready configuration with Hedera credentials
- **Testing Guides**: Complete E2E and beta testing documentation

## Reorganization Benefits

### Clear Separation of Concerns
- Frontend code isolated in `frontend/`
- Backend logic in `backend/`
- Blockchain operations in `blockchain/`
- Documentation in `docs/`
- Tools in `tools/`

### Modern Tech Stack
- **Next.js 16**: Latest version with App Router and Turbopack
- **React 19**: Concurrent features and improved performance
- **Material-UI v7**: Latest MUI with Material Design 3 support
- **TypeScript 5**: Advanced type system features
- **Tailwind CSS v4**: Utility-first CSS framework
- **Hedera SDK v2.75.0**: Latest Hedera JavaScript SDK

### Production Ready
- Optimized build configurations
- Environment variable management
- Security middleware implementation
- Comprehensive error handling
- Mobile-responsive design

## Future Considerations

### Potential Additions
- `frontend/src/components/`: Additional M3-styled components
- `backend/src/routes/`: Modular API route handlers
- `blockchain/contracts/`: Smart contract source files
- `tools/scripts/`: Build and deployment scripts
- `tools/config/`: Configuration files

### Deployment Pipeline
- Frontend can be deployed independently (Vercel)
- Backend can be deployed independently (Render)
- Blockchain scripts can be run separately
- Tools can include shared utilities

## Maintenance Notes

- Keep category directories focused on their purpose
- Avoid cross-category dependencies where possible
- Document any new subdirectories added
- Update this document when structure changes

---

*Last updated: October 29, 2025*</content>
<parameter name="filePath">E:\Polymath Universata\Projects\HederaCommunEA\docs\project-structure.md