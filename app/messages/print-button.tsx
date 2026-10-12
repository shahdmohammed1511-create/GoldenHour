"use client";

export default function PrintButton() {
  return (
    <button className="guestbook-print" onClick={() => window.print()} type="button">
      <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
        <path
          d="M6 6V2.75h8V6m-8 8H4.5A1.75 1.75 0 0 1 2.75 12.25v-3A1.75 1.75 0 0 1 4.5 7.5h11A1.75 1.75 0 0 1 17.25 9.25v3a1.75 1.75 0 0 1-1.75 1.75H14m-8-3.5h8v6.75H6v-6.75Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="1.5"
        />
      </svg>
      Print Messages
    </button>
  );
}
