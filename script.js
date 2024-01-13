if (typeof window !== 'undefined') {
  try {
    const key = 'X-XSS-Protection';
    if (typeof event !== 'undefined') {
      event.respondWith(new Response('', { headers: { [key]: '1; mode=block' }}));
    } else {
      const existing = document.head.querySelector(`meta[http-equiv="${key}"]`);
      if (existing) {
          existing.setAttribute('content', '1; mode=block');
      } else {
          const meta = document.createElement('meta');
          meta.setAttribute('http-equiv', key);
          meta.setAttribute('content', '1; mode=block');
          document.head.appendChild(meta);
      }
    }
  } catch (e) {
      console.log('Error protecting your security!');
  }
}
