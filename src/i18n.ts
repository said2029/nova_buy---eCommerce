import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import NotFound from './app/not-found';
 
// Can be imported from a shared config
const locales = ['en', 'ar'];
 
export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as any)) NotFound();
 
  return {
    messages: (await import(`../messages/${locale}.json`)).default
  };
});