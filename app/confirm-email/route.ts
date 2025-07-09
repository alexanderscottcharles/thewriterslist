import { NextResponse } from 'next/server';
import supabase from '../utils/supabase/server';

export async function GET(request: Request) {
  try {
   const url = new URL(request.url);
const uuid = url.searchParams.get('uuid');

if (!uuid) {
  return NextResponse.json({ error: 'Missing uuid' }, { status: 400 });
}

// Use uuid in your update query
const { error: updateError } = await supabase
  .from('submissions')
  .update({ email_confirmed: true })
  .eq('id', uuid);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json({ error: 'Failed to confirm email', details: updateError.message }, { status: 500 });
    }

    // Fetch user to redirect
    const { data: user, error: fetchError } = await supabase
      .from('submissions')
      .select('title')
      .eq('id', uuid)
      .single();

    if (fetchError || !user) {
      console.error('Supabase fetch error:', fetchError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const baseUrl = `${request.headers.get('x-forwarded-proto')}://${request.headers.get('host')}`;
const redirectUrl = user.title?.trim().toLowerCase() === 'writer'
  ? `${baseUrl}/writer_landing_page`
  : `${baseUrl}/professional_landing_page`;

return NextResponse.redirect(redirectUrl);


   
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
