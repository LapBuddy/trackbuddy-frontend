import Link from 'next/link'
import React from 'react'
import "./navbar.css"

export default function navbar() {
  return (
    <div className="navbar">
      <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/lapping/lapping">Lapping Data</Link>
          </li>
          <li>
            <Link href="/setups/setups">Setups Data</Link>
          </li>
        </ul>
    </div>
  )
}
