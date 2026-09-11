# Vercel KV Setup for Analytics

Your project already has Vercel KV integration for job storage. To enable persistent analytics, you need to set up Vercel KV.

## Option 1: Use Existing KV (Recommended)

If you already have Vercel KV configured for job storage, the analytics will automatically use the same KV store.

## Option 2: Set Up New Vercel KV

1. **Go to Vercel Dashboard**
   - Visit [vercel.com/dashboard](https://vercel.com/dashboard)
   - Select your `brantchat` project

2. **Add KV Database**
   - Go to "Storage" tab
   - Click "Create Database"
   - Choose "KV" (Key-Value)
   - Name it `brantchat-kv` or similar

3. **Get Connection Details**
   - Copy the `KV_REST_API_URL`
   - Copy the `KV_REST_API_TOKEN`

4. **Add Environment Variables**
   - Go to "Settings" → "Environment Variables"
   - Add:
     - `KV_REST_API_URL` = your KV URL
     - `KV_REST_API_TOKEN` = your KV token

5. **Redeploy**
   - Go to "Deployments" tab
   - Click "Redeploy" on latest deployment

## Option 3: Test Without KV (Fallback)

If you don't want to set up KV right now, the system will fall back to in-memory storage. Data will persist during the session but reset when Vercel restarts the function.

## Verification

After setup, test by:
1. Asking a question in your chat
2. Going to `/admin/analytics`
3. You should see the question logged

The system will automatically use KV if available, or fall back to memory if not.
