export function scrollToHash(hash) {
  if (!hash || hash === "#") {
    return false;
  }

  const target = document.querySelector(hash);

  if (!target) {
    return false;
  }

  if (window.location.hash !== hash) {
    window.history.pushState(null, "", hash);
  }

  const header = document.querySelector("header");
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const extraOffset = window.matchMedia("(max-width: 767px)").matches ? 36 : 28;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;

  window.scrollTo({
    top: Math.max(targetTop - headerHeight - extraOffset, 0),
    behavior: "smooth",
  });

  return true;
}

export function handleHashAnchorClick(event, href) {
  if (!href?.startsWith("#") || href === "#") {
    return false;
  }

  event.preventDefault();
  return scrollToHash(href);
}
