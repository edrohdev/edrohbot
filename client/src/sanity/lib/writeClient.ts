import { createClient } from "next-sanity";

import { apiVersion, dataset, projectId } from "../env";

// Server-only: carries a write token. Never import from client components —
// the token must not end up in a browser bundle.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});
