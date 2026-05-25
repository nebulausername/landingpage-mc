import { cookies } from 'next/headers';
import { adminEnabled, verifySessionToken, COOKIE_NAME } from '@/lib/admin/auth';
import { config } from '@/lib/config';
import en from '@/lib/translations/en';
import de from '@/lib/translations/de';
import es from '@/lib/translations/es';
import LoginForm from './LoginForm';
import Editor from './Editor';

export const dynamic = 'force-dynamic';

export default function AdminPage() {
  const enabled = adminEnabled();
  const cookieStore = cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  const authed = enabled && verifySessionToken(token);

  if (!authed) {
    return <LoginForm enabled={enabled} />;
  }

  const initial = {
    config: JSON.parse(JSON.stringify(config)),
    translations: {
      en: JSON.parse(JSON.stringify(en)),
      de: JSON.parse(JSON.stringify(de)),
      es: JSON.parse(JSON.stringify(es)),
    },
  };

  return <Editor initial={initial} />;
}
