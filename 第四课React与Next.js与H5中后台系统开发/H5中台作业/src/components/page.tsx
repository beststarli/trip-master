import { useState, useEffect, useCallback } from "react"
import { LoginPage } from "@/components/loginPage"
import { FeatureList } from "@/components/featureList"
import { FeatureForm } from "@/components/featureForm"
import { INITIAL_FEATURES, type Feature } from "@/utils/data"
import { getCurrentUser, logout, type User } from "@/utils/auth"
import { PermissionManagement } from "@/components/permissionManagement"
import { DashboardLayout, type PageKey } from "@/components/dashboardLayout"

export default function Page() {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState<PageKey>("features");
    const [features, setFeatures] = useState<Feature[]>(INITIAL_FEATURES);
    const [editingFeature, setEditingFeature] = useState<Feature | null>(null);

    // Check cookie on mount
    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
        }
        setLoading(false);
    }, []);

    const handleLoginSuccess = useCallback(() => {
        const currentUser = getCurrentUser();
        setUser(currentUser);
    }, []);

    const handleLogout = useCallback(() => {
        logout();
        setUser(null);
        setCurrentPage("features");
        setEditingFeature(null);
    }, []);

    const handleNavigate = useCallback((page: PageKey) => {
        setCurrentPage(page);
        setEditingFeature(null);
    }, []);

    const handleCreateNew = useCallback(() => {
        setEditingFeature(null);
        setCurrentPage("form");
    }, []);

    const handleEdit = useCallback((feature: Feature) => {
        setEditingFeature(feature);
        setCurrentPage("form");
    }, []);

    const handleDelete = useCallback((id: string) => {
        setFeatures((prev) => prev.filter((f) => f.id !== id));
    }, []);

    const handleSave = useCallback((feature: Feature) => {
        setFeatures((prev) => {
            const existing = prev.find((f) => f.id === feature.id);
            if (existing) {
                return prev.map((f) => (f.id === feature.id ? feature : f));
            }
            return [feature, ...prev];
        });
        setCurrentPage("features");
        setEditingFeature(null);
    }, []);

    const handleBackFromForm = useCallback(() => {
        setCurrentPage("features");
        setEditingFeature(null);
    }, []);

    // Loading state
    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center bg-background">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        );
    }

    // Not logged in
    if (!user) {
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
    }

    // Dashboard
    return (
        <DashboardLayout
            user={user}
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
        >
            {currentPage === "features" && (
                <FeatureList
                    features={features}
                    user={user}
                    onCreateNew={handleCreateNew}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                />
            )}
            {currentPage === "permissions" && <PermissionManagement />}
            {currentPage === "form" && (
                <FeatureForm
                    feature={editingFeature}
                    user={user}
                    onSave={handleSave}
                    onBack={handleBackFromForm}
                />
            )}
        </DashboardLayout>
    );
}
