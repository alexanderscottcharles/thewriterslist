import { NextResponse } from 'next/server';
import supabase from '../utils/supabase/server';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Missing id' }, { status: 400 });
    }

    // Attempt update
    const { error: updateError } = await supabase
      .from('submissions')
      .update({ email_confirmed: true })
      .eq('id', id);

    if (updateError) {
      console.error('Supabase update error:', updateError);
      return NextResponse.json({ error: 'Failed to confirm email', details: updateError.message }, { status: 500 });
    }

    // Fetch user to redirect
    const { data: user, error: fetchError } = await supabase
      .from('submissions')
      .select('title')
      .eq('id', id)
      .single();

    if (fetchError || !user) {
      console.error('Supabase fetch error:', fetchError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Redirect based on title
    const redirectUrl = user.title === 'Writer'
      ? '/writers-landing'
      : '/professionals-landing';

    return NextResponse.redirect(redirectUrl);
  } catch (err) {
    console.error('Unexpected error:', err);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
