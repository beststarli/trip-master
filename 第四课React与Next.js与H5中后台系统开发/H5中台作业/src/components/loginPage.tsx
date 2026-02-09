import React from "react"
import { useState } from "react"
import { Lock, User, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { login } from "@/utils/auth"

interface LoginPageProps {
    onLoginSuccess: () => void;
}

export function LoginPage({ onLoginSuccess }: LoginPageProps) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        if (!username.trim() || !password.trim()) {
            setError("Please enter username and password");
            return;
        }

        setLoading(true);
        // Simulate network delay
        setTimeout(() => {
            const user = login(username, password);
            if (user) {
                onLoginSuccess();
            } else {
                setError("Invalid username or password");
            }
            setLoading(false);
        }, 600);
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted px-4">
            <div className="w-full max-w-md">
                {/* Logo & Title */}
                <div className="mb-8 text-center">
                    <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
                        <Shield className="h-7 w-7 text-primary-foreground" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-foreground">
                        Feature Management Platform
                    </h1>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Enterprise feature and permission management system
                    </p>
                </div>

                {/* Login Card */}
                <div className="rounded-xl border border-border bg-card p-8 shadow-sm">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                        <div className="flex flex-col gap-2">
                            <Label htmlFor="username" className="text-sm font-medium text-foreground">
                                Username
                            </Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    className="pl-10 h-11 bg-muted/50 border-border focus:bg-card"
                                />
                            </div>
                        </div>

                        <div className="flex flex-col gap-2">
                            <Label htmlFor="password" className="text-sm font-medium text-foreground">
                                Password
                            </Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 pr-10 h-11 bg-muted/50 border-border focus:bg-card"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4" />
                                    ) : (
                                        <Eye className="h-4 w-4" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="rounded-lg bg-destructive/10 px-4 py-2.5 text-sm text-destructive">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="h-11 w-full text-sm font-medium"
                            disabled={loading}
                        >
                            {loading ? "Signing in..." : "Sign In"}
                        </Button>
                    </form>

                    <div className="mt-6 rounded-lg bg-muted/50 p-4">
                        <p className="mb-2 text-xs font-medium text-muted-foreground">Demo Accounts:</p>
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                            <span>admin / admin123 (Full Access)</span>
                            <span>editor / editor123 (Edit Access)</span>
                            <span>viewer / viewer123 (Read Only)</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
