/**
 * BetterAuth API Route Handler
 * Handles all authentication endpoints for email/password and OAuth
 * Route: /api/auth/[...auth] - Catch-all route for auth operations
 */

import { auth } from "../../../../lib/auth";

/**
 * GET handler - Handles auth callbacks and session retrieval
 */
export async function GET(request) {
    return auth.handler(request);
}

/**
 * POST handler - Handles login, registration, and other auth mutations
 */
export async function POST(request) {
    return auth.handler(request);
}
