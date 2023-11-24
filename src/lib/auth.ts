const TOKEN_ENDPOINT = process.env.NEXT_PUBLIC_API_TOKEN_ENDPOINT;
const USERNAME = process.env.NEXT_PUBLIC_API_USERNAME;
const PASSWORD = process.env.NEXT_PUBLIC_API_PASSWORD;
const CLIENT_ID = process.env.NEXT_PUBLIC_API_CLIENT_ID;
const CLIENT_SECRET = process.env.NEXT_PUBLIC_API_CLIENT_SECRET;
const GRANT_TYPE = process.env.NEXT_PUBLIC_API_GRANT_TYPE;

/**
 * Fetches the OAuth2 token using the password grant type.
 */
export async function getAuthToken() {
  console.log({
    TOKEN_ENDPOINT,
    USERNAME,
    PASSWORD,
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
  });

  // Check if environment variables are set
  if (
    !TOKEN_ENDPOINT ||
    !USERNAME ||
    !PASSWORD ||
    !CLIENT_ID ||
    !CLIENT_SECRET ||
    !GRANT_TYPE
  ) {
    console.error(
      "API credentials or endpoint are not set in environment variables."
    );
    return null;
  }

  try {
    const body = new URLSearchParams({
      grant_type: GRANT_TYPE,
      username: USERNAME,
      password: PASSWORD,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    });

    const response = await fetch(TOKEN_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch auth token: ${response.statusText}`);
    }

    const data = await response.json();
    return data.access_token;
  } catch (error) {
    console.error("Error fetching auth token:", error);
    return null;
  }
}
