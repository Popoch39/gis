import type * as React from "react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"

export function SidebarSkeleton({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* TeamSwitcher skeleton */}
        <div className="flex items-center gap-2 p-2">
          <Skeleton className="h-8 w-8 rounded-md" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="ml-auto h-4 w-4 rounded-full" />
        </div>
      </SidebarHeader>
      <SidebarContent>
        {/* NavMain skeleton */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-24" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.from({ length: 4 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* NavProjects skeleton */}
        <SidebarGroup>
          <SidebarGroupLabel>
            <Skeleton className="h-4 w-20" />
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Array.from({ length: 3 }).map((_, index) => (
                <SidebarMenuItem key={index}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        {/* NavUser skeleton */}
        <div className="flex items-center gap-2 px-2 py-2">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="flex flex-col gap-1">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
          <Skeleton className="ml-auto h-4 w-4 rounded-full" />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
