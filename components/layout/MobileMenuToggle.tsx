'use client'

import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sidebar } from './Sidebar'

interface MobileMenuToggleProps {
  userType: 'seeker' | 'employer' | 'admin'
}

export function MobileMenuToggle({ userType }: MobileMenuToggleProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden"
      >
        {isOpen ? (
          <X className="w-5 h-5" />
        ) : (
          <Menu className="w-5 h-5" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setIsOpen(false)}
          />
          <Sidebar
            userType={userType}
            isOpen={isOpen}
            onClose={() => setIsOpen(false)}
          />
        </>
      )}
    </>
  )
}
