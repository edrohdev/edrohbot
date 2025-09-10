# Sanity Migration Setup Instructions

## Overview

Your blog data has been migrated from the local `posts.json` file to Sanity's cloud storage. Here's what you need to do to complete the setup.

## Pre-Migration Steps

### 1. Create a Sanity API Token

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your "edrohbotics" project
3. Navigate to "API" → "Tokens"
4. Click "Add API token"
5. Give it a name like "Migration Token"
6. Set permissions to "Editor"
7. Copy the token

### 2. Add Environment Variables

Add this to your `.env.local` file:

```bash
# Your existing variables should already be here:
# NEXT_PUBLIC_SANITY_PROJECT_ID=9p3v4q5r
# NEXT_PUBLIC_SANITY_DATASET=production
# NEXT_PUBLIC_SANITY_API_VERSION=2025-08-31

# Add this new one for migration:
SANITY_API_TOKEN=your_token_here
```

## Migration Steps

### 3. Run the Migration

Execute the migration script to import your posts:

```bash
npm run migrate-posts
```

This will:

- Transform your posts.json data to match Sanity's schema
- Create all 12 posts in your Sanity project
- Generate slugs automatically

### 4. Verify in Sanity Studio

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000/studio`
3. You should see all your posts in the "Post" section
4. Verify the data looks correct

### 5. Test Your Website

1. Go to `http://localhost:3000`
2. Your blog should now load data from Sanity instead of the local JSON file
3. Check that:
   - Featured posts appear correctly
   - All posts section shows regular posts
   - Latest posts sidebar works

## What Changed

### Schema Updates

- Created a new Sanity schema that matches your posts.json structure
- Added fields for: title, excerpt, category, datetime, author, readTime, image, content, featuredStatus
- Includes automatic slug generation

### Component Updates

- `AllPosts.tsx`: Now fetches from `getRegularPosts()`
- `Featured.tsx`: Now uses `getFeaturedPost()`, `getSubFeaturedPosts()`, and `getLatestPosts()`
- `PostCard.tsx`: Updated to use Sanity's Post interface
- `HomeContent.tsx`: Added Suspense for loading states

### New Files

- `src/sanity/lib/posts.ts`: Helper functions for fetching posts
- `scripts/migrate-posts.js`: One-time migration script
- This instruction file

## Benefits

✅ **Cloud Storage**: Your content is now stored in Sanity's cloud  
✅ **Content Management**: Easy editing via Sanity Studio  
✅ **Real-time Updates**: Content changes reflect immediately  
✅ **Scalability**: No more local JSON file limitations  
✅ **Collaboration**: Multiple editors can manage content  
✅ **Version History**: Built-in content versioning

## Next Steps

After successful migration, you can:

1. Delete the local `src/data/posts/posts.json` file
2. Remove the migration script if desired
3. Start adding new posts via Sanity Studio
4. Deploy to Vercel (remember to add environment variables there too)

## Troubleshooting

- **Migration fails**: Check your API token and environment variables
- **Posts not showing**: Verify the migration completed successfully in Sanity Studio
- **Build errors**: Check that all TypeScript types match the new Post interface
