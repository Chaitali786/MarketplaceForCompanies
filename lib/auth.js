// lib/auth.js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL, 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const signUp = async (email, password, role) => {
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                email,  // Pass email to store in profiles
                role    // Pass role as metadata
            }
        }
    });

    if (error) throw error;
    return data;
};


export const insertProfile = async (role) => {
    const { data: user, error: authError } = await supabase.auth.getUser();
    if (authError || !user?.user?.id) throw new Error("User is not authenticated.");

    const { error: profileError } = await supabase.from('profiles').insert({
        id: user.user.id,
        role
    });
    if (profileError) throw profileError;

    return { message: "Profile created successfully" };
};
export const getUserRole = async () => {
    const { data: user, error: authError } = await supabase.auth.getUser();
    if (authError || !user?.user?.id) throw new Error("User is not authenticated.");

    const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.user.id)
        .single();

    if (profileError) throw profileError;

    return profile.role;
};