const id = import.meta.env.VITE_GA;

export default function ga() {
  function gtag() {
    window.dataLayer.push(arguments);
  }

  if (id && import.meta.env.PROD) {
    const script = document.createElement('script');
    script.setAttribute('async', '');
    script.setAttribute('src', `https://www.googletagmanager.com/gtag/js?id=${id}`);
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', id);
  }
}
