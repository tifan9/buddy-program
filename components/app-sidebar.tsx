"use client"

import * as React from "react"
import { BarChart3, Calendar, Home, Settings, Target, Trophy, Users, Shield, MessageSquare } from 'lucide-react'

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import { TeamSwitcher } from "@/components/team-switcher"
import { Logo } from "@/components/logo"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

// This is sample data.
const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder-user.jpg",
  },
  teams: [
    {
      name: "Accountability Buddy",
      logo: "/logo.png",
      plan: "Personal",
    },
  ],
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: Home,
      isActive: true,
    },
    {
      title: "Goals",
      url: "/goals",
      icon: Target,
    },
    {
      title: "Progress",
      url: "/progress",
      icon: BarChart3,
    },
    {
      title: "My Buddy",
      url: "/buddy",
      icon: Users,
    },
    {
      title: "Badges",
      url: "/badges",
      icon: Trophy,
    },
    {
      title: "Admin Panel",
      url: "/admin",
      icon: Shield,
    },
    {
      title: "Settings",
      url: "/settings",
      icon: Settings,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <div className="flex items-center justify-center p-2">
          <Logo size="lg" showText={false} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
