import Link from 'next/link'
import React from 'react'

export default function navbar() {
  return (
    <div>
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