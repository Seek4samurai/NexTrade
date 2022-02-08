import sanityClient from "@sanity/client";

export const client = sanityClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT!, // here
  dataset: "production",
  apiVersion: "2021-03-25",
  // here
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN!,
  useCdn: false,
});
