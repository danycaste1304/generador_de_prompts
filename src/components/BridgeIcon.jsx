export default function BridgeIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <path
        d="M10 42h44"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 42c3.5-13 10-20 18-20s14.5 7 18 20"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M24 42V30M32 42V22M40 42V30"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <path
        d="M14 50h6M28 50h8M44 50h6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.55"
      />
      <circle cx="12" cy="42" r="3" fill="currentColor" />
      <circle cx="52" cy="42" r="3" fill="currentColor" />
    </svg>
  );
}
