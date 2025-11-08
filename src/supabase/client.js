import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
	console.error('[Supabase] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY.\nCreate a \.env.local file in the project root with:')
	console.error('VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co')
	console.error('VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY')
}

export const supabase = supabaseConfigured
	? createClient(supabaseUrl, supabaseAnonKey)
	: {
			from() {
				throw new Error('Supabase client unavailable: environment variables are missing. Add them in .env.local and restart dev server.')
			},
			storage() {
				throw new Error('Supabase client unavailable: environment variables are missing.')
			}
		}
