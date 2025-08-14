"use client"

import { Button } from "@/components/ui/button"
import { LogOut, User, Home } from "lucide-react"

interface AdminHeaderProps {
  onSignOut: () => void
}

export function AdminHeader({ onSignOut }: AdminHeaderProps) {
  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img src="/innovia-logo.png" alt="InnovIA Technologies" className="w-10 h-10" />
            <div>
              <h1 className="text-xl font-bold text-white">InnovIA Admin</h1>
              <p className="text-sm text-gray-400">Content Management System</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              onClick={() => window.open("/", "_blank")}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <Home className="w-4 h-4 mr-2" />
              View Site
            </Button>
            <div className="flex items-center space-x-2 text-gray-300">
              <User className="w-4 h-4" />
              <span className="text-sm">Admin User</span>
            </div>
            <Button
              onClick={onSignOut}
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
