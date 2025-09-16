# Vercel Blob Storage Setup

This project is configured to use Vercel Blob Storage for media uploads in production.

## Environment Variables Required

### Production Environment Variables

Add the following environment variable to your Vercel project:

```bash
BLOB_READ_WRITE_TOKEN=your_blob_token_here
```

**Note:** This token is automatically provided by Vercel when you add Blob storage to your project. You don't need to manually create this token.

## Setup Steps

1. **Add Blob Storage to your Vercel project:**
   - Go to your Vercel project dashboard
   - Navigate to the "Storage" tab
   - Click "Create Database" and select "Blob"
   - Vercel will automatically set the `BLOB_READ_WRITE_TOKEN` environment variable

2. **Deploy your project:**
   - The Vercel Blob storage plugin is configured to only activate in production (`NODE_ENV === 'production'`)
   - In development, files will continue to be stored locally

## Configuration Details

The Vercel Blob storage is configured with the following settings:

- **Enabled only in production:** `enabled: process.env.NODE_ENV === 'production'`
- **Collections:** Only the `media` collection uses Vercel Blob storage
- **Client uploads:** Enabled to bypass Vercel's 4.5MB server upload limit
- **Token:** Uses `BLOB_READ_WRITE_TOKEN` environment variable

## Features

- **Automatic local storage disable:** When Vercel Blob is enabled, local storage is automatically disabled for the configured collections
- **Client uploads:** Large files (>4.5MB) are uploaded directly from the client to Vercel Blob
- **Cache control:** Files are cached for 1 year by default
- **Random suffix:** File names get random suffixes to prevent conflicts

## Testing

To test the setup:

1. Deploy to Vercel with Blob storage enabled
2. Upload a media file through the Payload admin panel
3. Verify the file is stored in Vercel Blob and accessible via the generated URL

## Troubleshooting

- **Missing token:** Ensure `BLOB_READ_WRITE_TOKEN` is set in your Vercel environment variables
- **Upload failures:** Check that Blob storage is properly enabled in your Vercel project
- **Large file uploads:** Client uploads are enabled to handle files larger than 4.5MB
