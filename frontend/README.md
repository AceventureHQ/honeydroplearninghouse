This is a [Next.js](https://nextjs.org) project for Honeydrop Learning House.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Square Payments

The enrolment form now uses Square Web Payments in the browser. The card fields load on the page, the card is tokenized in the browser, and the server creates the payment with that token.

Set these environment variables in `frontend/.env.local` or in your hosting environment:

- `NEXT_PUBLIC_SQUARE_ENVIRONMENT=sandbox` or `NEXT_PUBLIC_SQUARE_ENVIRONMENT=production`
- `NEXT_PUBLIC_SQUARE_APP_ID` for the selected Square app, or `NEXT_PUBLIC_SQUARE_SANDBOX_APP_ID` / `NEXT_PUBLIC_SQUARE_PRODUCTION_APP_ID`
- `NEXT_PUBLIC_SQUARE_LOCATION_ID` for the selected Square location, or `NEXT_PUBLIC_SQUARE_SANDBOX_LOCATION_ID` / `NEXT_PUBLIC_SQUARE_PRODUCTION_LOCATION_ID`
- `SQUARE_ENVIRONMENT=sandbox` or `SQUARE_ENVIRONMENT=production`
- `SQUARE_ACCESS_TOKEN` for the selected Square environment, or `SQUARE_SANDBOX_ACCESS_TOKEN` / `SQUARE_PRODUCTION_ACCESS_TOKEN`
- `SQUARE_LOCATION_ID` for the selected Square location, or `SQUARE_SANDBOX_LOCATION_ID` / `SQUARE_PRODUCTION_LOCATION_ID`

Optional notification settings:

- `RESEND_API_KEY` to email the office after a checkout link is created
- `OFFICE_EMAIL` to change the notification recipient
- `CHECKOUT_FROM_EMAIL` to change the sender used by Resend

To switch between sandbox and production, update both environment selectors and the matching app ID, token, and location pair, then restart the dev server.

If Square returns `401 Unauthorized`, the token usually does not match the selected environment. Sandbox payments require sandbox Square credentials, and production payments require production Square credentials.

If Square returns `Invalid location id`, the selected location does not belong to the same environment as the app ID and token.

Workflow:

1. Choose sandbox for testing or production for live payments.
2. Restart the dev server after changing the environment.
3. Open a course, complete the enrolment form, and enter the card in the Square payment field.
4. Submit the form to tokenize the card in the browser and charge it on the server.

The Square access token stays on the server. The browser only receives the payment widget and tokenized card data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
