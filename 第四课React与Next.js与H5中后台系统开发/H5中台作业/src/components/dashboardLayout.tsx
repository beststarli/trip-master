"use client";

import React from "react"

import { useState } from "react";
import {
    LayoutDashboard,
    List,
    ShieldCheck,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Menu,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { User } from "@/utils/auth";

export type PageKey = "features" | "permissions" | "form";

interface DashboardLayoutProps {
    user: User;
    currentPage: PageKey;
    onNavigate: (page: PageKey) => void;
    onLogout: () => void;
    children: React.ReactNode;
}

const NAV_ITEMS: { key: PageKey; label: string; icon: React.ElementType; permission?: string }[] = [
    { key: "features", label: "Feature List", icon: List },
    { key: "permissions", label: "Permission Management", icon: ShieldCheck, permission: "permission:manage" },
];

export function DashboardLayout({
    user,
    currentPage,
    onNavigate,
    onLogout,
    children,
}: DashboardLayoutProps) {
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const visibleNavItems = NAV_ITEMS.filter(
        (item) => !item.permission || user.permissions.includes(item.permission)
    );

    const roleLabel =
        user.role === "admin" ? "Administrator" : user.role === "editor" ? "Editor" : "Viewer";

    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Mobile overlay */}
            {mobileOpen && (
                <div
                    className="fixed inset-0 z-30 bg-foreground/20 md:hidden"
                    onClick={() => setMobileOpen(false)}
                    onKeyDown={() => { }}
                    role="presentation"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
          fixed inset-y-0 left-0 z-40 flex flex-col border-r border-sidebar-border bg-sidebar
          transition-all duration-300
          md:static md:z-auto
          ${collapsed ? "w-[68px]" : "w-60"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
            >
                {/* Sidebar header */}
                <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-4">
                    {!collapsed && (
                        <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                                <LayoutDashboard className="h-4 w-4 text-primary-foreground" />
                            </div>
                            <span className="text-sm font-semibold text-sidebar-foreground">FMP</span>
                        </div>
                    )}
                    <button
                        onClick={() => setCollapsed(!collapsed)}
                        className="hidden rounded-md p-1 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground md:flex"
                    >
                        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 overflow-y-auto p-3">
                    <ul className="flex flex-col gap-1">
                        {visibleNavItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = currentPage === item.key;
                            return (
                                <li key={item.key}>
                                    <button
                                        onClick={() => {
                                            onNavigate(item.key);
                                            setMobileOpen(false);
                                        }}
                                        className={`
                      flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors
                      ${isActive
                                                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                                            }
                    `}
                                        title={collapsed ? item.label : undefined}
                                    >
                                        <Icon className="h-4 w-4 shrink-0" />
                                        {!collapsed && <span>{item.label}</span>}
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* User section */}
                <div className="border-t border-sidebar-border p-3">
                    <div
                        className={`flex items-center ${collapsed ? "justify-center" : "justify-between"}`}
                    >
                        {!collapsed && (
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-sidebar-foreground">
                                    {user.username}
                                </span>
                                <span className="text-xs text-sidebar-foreground/50">{roleLabel}</span>
                            </div>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-destructive"
                            onClick={onLogout}
                            title="Sign out"
                        >
                            <LogOut className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main content */}
            <div className="flex flex-1 flex-col overflow-hidden">
                {/* Top bar */}
                <header className="flex h-14 items-center gap-4 border-b border-border bg-card px-4 md:px-6">
                    <button
                        onClick={() => setMobileOpen(true)}
                        className="rounded-md p-1 text-muted-foreground hover:bg-accent md:hidden"
                    >
                        <Menu className="h-5 w-5" />
                    </button>
                    <h2 className="text-sm font-semibold text-foreground">
                        {currentPage === "features" && "Feature Management"}
                        {currentPage === "permissions" && "Permission Management"}
                        {currentPage === "form" && "Create / Edit Feature"}
                    </h2>
                </header>

                {/* Page content */}
                <main className="flex-1 overflow-y-auto p-4 md:p-6">{children}</main>
            </div>
        </div>
    );
}
