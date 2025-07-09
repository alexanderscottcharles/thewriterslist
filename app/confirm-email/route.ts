import { NextResponse } from 'next/server';
import supabase from '../utils/supabase/server'

export async function GET(request: Request) {
  const url = new URL(request.url);
  const uuid = url.searchParams.get('uuid');

  if (!uuid) {
    return NextResponse.json({ error: 'Missing uuid' }, { status: 400 });
  }

  // Update email_confirmed = true for the user
  const { error: updateError } = await supabase
    .from('submissions')
    .update({ email_confirmed: true })
    .eq('uuid', uuid);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to confirm email' }, { status: 500 });
  }

  // Fetch the user to get the role/title
  const { data: user, error: fetchError } = await supabase
    .from('submissions')
    .select('title')
    .eq('uuid', uuid)
    .single();

  if (fetchError || !user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  // Redirect to appropriate landing page
  const redirectUrl = user.title === 'Writer'
    ? '/writers-landing'
    : '/professionals-landing';

  return NextResponse.redirect(redirectUrl);
}
