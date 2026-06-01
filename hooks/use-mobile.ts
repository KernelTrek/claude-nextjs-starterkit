"use client"

import { useEffect, useState } from "react"

// Check if the screen is mobile (max-width: 768px)
export function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    // Check initial size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()

    // Listen for resize
    const unsubscribe = () => {
      window.removeEventListener("resize", checkMobile)
    }

    window.addEventListener("resize", checkMobile)
    return unsubscribe
  }, [])

  return isMobile
}
