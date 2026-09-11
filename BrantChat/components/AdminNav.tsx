'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Upload, Briefcase, Settings, Home, BarChart3, MessageSquare } from 'lucide-react'

export default function AdminNav() {
  const pathname = usePathname()

  const navItems = [
    { href: '/', label: 'Chat', icon: Home },
    { href: '/admin/upload', label: 'CV Upload', icon: Upload },
    { href: '/admin/jobs', label: 'Job Roles', icon: Briefcase },
    { href: '/admin/questions', label: 'Questions', icon: MessageSquare },
    { href: '/admin/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/admin', label: 'Settings', icon: Settings },
  ]

  return (
    <nav className="bg-chat-sidebar border-b border-chat-border p-4">
      <div className="max-w-6xl mx-auto flex space-x-6">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:bg-chat-input hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
