# Deployment Phase Quick Guide

This is a short index for deployment resources. For the complete step-by-step deployment walkthrough, open the full guide below.

- Full deployment guide: [Hedera-dApp-Deployment-Guide.md](./Hedera-dApp-Deployment-Guide.md)
- Examples and configurations: [EXAMPLES.md](./EXAMPLES.md)

Summary:
- Frontend: Vercel (Next.js/React)
- Backend: Render (Node/Express) or serverless functions
- Storage: IPFS / Pinata for media and metadata
- Tokens: Hedera Token Service (HTS) for most token use-cases

Tips:
- Test on Hedera testnet first
- Keep secrets out of the repo (use env vars)

After deployment, prepare your submission artifacts in [../submission/README.md](../submission/README.md).