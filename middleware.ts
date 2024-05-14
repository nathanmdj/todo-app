export {default} from 'next-auth/middleware';

export const config = {
  matcher: ['/today', '/api', '/inbox', '/upcoming', '/completed'], //put all routes that you want to protect
  // exclude: ['/api/auth/*', '/api/auth/sign/*']
}

