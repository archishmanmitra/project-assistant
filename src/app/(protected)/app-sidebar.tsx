'use client';
import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar';
import useProject from '@/hooks/use-project';
import { cn } from '@/lib/utils';
import { Bot, CreditCard, GitBranchPlus, LayoutDashboard, Plus, Presentation } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const items = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Q&A',
    url: '/qa',
    icon: Bot,
  },
  {
    title: 'Meetings',
    url: '/meetings',
    icon: Presentation,
  },
  {
    title: 'Billing',
    url: '/billing',
    icon: CreditCard,
  },
];



const AppSidebar = () => {
  const pathname = usePathname();
  const { open } = useSidebar();
  const { projects, projectId, setProjectId } = useProject()
  return (
    <Sidebar suppressHydrationWarning collapsible="icon" variant="floating" >
      <SidebarHeader>
        <div className="flex items-center justify-start gap-2">
            <Image height={42} width={42} src="/logo.png" alt='logo'/>
    
            {open && (
            <h1 className='text-xl font-extrabold text-primary'>Aetheris</h1>
            )}
        
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.url}
                      className={cn(
                        { '!bg-primary !text-white': pathname === item.url },
                        'list-none'
                      )}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Your Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project) => (
                <SidebarMenuItem key={project.name}>
                  <SidebarMenuButton asChild>
                    <div onClick={()=>{setProjectId(project.id)}}>
                      <div
                        className={cn(
                          'flex size-6 items-center justify-center rounded-sm border bg-white text-sm text-black',
                          { 'bg-primary text-white': project.id === projectId }
                        )}
                      >
                        {project.name[0]}
                      </div>
                      <span>{project.name}</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <div className="h-2"></div>
              {open && (
              <SidebarMenuItem>
                <Link href='/create'>
                    <Button variant={'outline'} className='w-fit'><Plus/>Create Project</Button>
                </Link>
              </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
