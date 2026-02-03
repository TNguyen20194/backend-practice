import { createClient } from '@supabase/supabase-js'
import "dotenv/config"

const projectURL = process.env.SUPABASE_URL;
const APIKey = process.env.SUPABASE_KEY

// Create a single supabase client for interacting with your database
const supabase = createClient(projectURL, APIKey)

export default supabase;