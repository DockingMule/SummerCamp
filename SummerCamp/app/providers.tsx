"use client";

import React from 'react';
import createAuthStore from 'react-auth-kit/store/createAuthStore';
import AuthProvider from 'react-auth-kit/AuthProvider';

const Providers = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const store = React.useMemo(() => {
    if (typeof window === 'undefined') return undefined;
    try {
      const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
      const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '';
      const cookieDomain = isLocalhost ? undefined : hostname;
      const cookieSecure = window.location.protocol === 'https:';

      return createAuthStore('cookie', {
        authName: "__auth",
        cookieDomain,
        cookieSecure,
        cookieSameSite: 'lax',
      });
    } catch (e) {
      // fallback to undefined if store creation fails
      // eslint-disable-next-line no-console
      console.error('createAuthStore error', e);
      return undefined;
    }
  }, [] as const);

  // Render a lightweight placeholder on the server and until the client mounts
  if (!mounted) return <div id="auth-loading" />;

  if (!store) return <>{children}</>;

  return (
    <AuthProvider store={store}>
      {children}
    </AuthProvider>
  );
};

export default Providers;
