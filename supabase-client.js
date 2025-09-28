let _supabase = null;

/**
 * Fetches Supabase configuration from the Edge Function and initializes the client.
 * This function ensures that the Supabase client is a singleton and initialized only once.
 * @returns {Promise<supabase.SupabaseClient>} The initialized Supabase client.
 */
async function getSupabaseClient() {
    // If the client is already initialized, return it.
    if (_supabase) {
        return _supabase;
    }

    try {
        // URL of your deployed Edge Function
        const functionUrl = '/functions/v1/get-supabase-config';
        
        const response = await fetch(functionUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch Supabase config: ${response.statusText}`);
        }

        const config = await response.json();

        if (!config.url || !config.key) {
            throw new Error('Invalid config received from server.');
        }

        // Initialize the Supabase client with the fetched credentials
        _supabase = supabase.createClient(config.url, config.key);
        
        return _supabase;

    } catch (error) {
        console.error("Error initializing Supabase client:", error);
        // You could display an error message to the user here
        throw error; // Re-throw the error to stop further execution
    }
}