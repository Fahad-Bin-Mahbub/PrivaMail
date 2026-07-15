"use client";

import React from "react";

interface LogoProps {
  className?: string;
}

export function Logo({ className = "h-8 w-8" }: LogoProps) {
  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="primary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        <linearGradient id="secondary" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>

      {/* Background circle */}
      <circle
        cx="256"
        cy="256"
        r="220"
        fill="url(#primary)"
        opacity="0.12"
      />

      {/* Envelope */}
      <rect
        x="110"
        y="180"
        width="292"
        height="170"
        rx="28"
        stroke="url(#primary)"
        strokeWidth="16"
        fill="none"
      />

      {/* Envelope flap */}
      <path
        d="M110 190 L256 295 L402 190"
        stroke="url(#primary)"
        strokeWidth="16"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Lock body */}
      <rect
        x="195"
        y="235"
        width="122"
        height="110"
        rx="22"
        fill="url(#secondary)"
      />

      {/* Lock shackle */}
      <path
        d="M220 235V200C220 170 236 150 256 150C276 150 292 170 292 200V235"
        stroke="url(#secondary)"
        strokeWidth="16"
        strokeLinecap="round"
      />

      {/* Keyhole */}
      <circle
        cx="256"
        cy="280"
        r="10"
        fill="white"
      />

      <rect
        x="252"
        y="288"
        width="8"
        height="24"
        rx="4"
        fill="white"
      />
    </svg>
  );
}