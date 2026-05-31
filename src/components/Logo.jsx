export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg
      viewBox="0 0 64 64"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Samps Projetos"
    >
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#818CF8" />
          <stop offset="0.5" stopColor="#6366F1" />
          <stop offset="1" stopColor="#22D3EE" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="#0D1224" />
      <rect
        x="1"
        y="1"
        width="62"
        height="62"
        rx="15"
        stroke="url(#logoGrad)"
        strokeOpacity="0.45"
        strokeWidth="2"
      />
      <path
        d="M22 24c0-3.3 2.9-6 6.8-6h12.7v6.5H29.4c-.9 0-1.4.4-1.4 1 0 .7.5 1 1.6 1.3l6.7 1.7c4 1 6.2 3.2 6.2 6.8 0 4-3.1 6.9-7.4 6.9H21.8V41.6h12.9c1 0 1.6-.4 1.6-1.1 0-.6-.5-1-1.6-1.3l-6.5-1.6C24.2 36.5 22 34.3 22 30.6V24Z"
        fill="url(#logoGrad)"
      />
    </svg>
  );
}
