import { useState, useMemo } from "react"
import { Search, RotateCcw, Plus, Eye, Copy, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import type { Feature } from "@/utils/data"
import { FEATURE_CATEGORIES } from "@/utils/data"
import type { User } from "@/utils/auth"
import { hasPermission } from "@/utils/auth"

interface FeatureListProps {
    features: Feature[];
    user: User;
    onCreateNew: () => void;
    onEdit: (feature: Feature) => void;
    onDelete: (id: string) => void;
}

const STATUS_MAP: Record<string, { label: string; variant: "default" | "secondary" | "outline" | "destructive" }> = {
    online: { label: "Online", variant: "default" },
    offline: { label: "Offline", variant: "secondary" },
    testing: { label: "Testing", variant: "outline" },
};

const RISK_MAP: Record<string, { label: string; className: string }> = {
    low: { label: "Low", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    medium: { label: "Medium", className: "bg-amber-50 text-amber-700 border-amber-200" },
    high: { label: "High", className: "bg-red-50 text-red-700 border-red-200" },
};

export function FeatureList({ features, user, onCreateNew, onEdit, onDelete }: FeatureListProps) {
    const [nameFilter, setNameFilter] = useState("");
    const [descFilter, setDescFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [creatorFilter, setCreatorFilter] = useState("");
    const [deleteDialog, setDeleteDialog] = useState<Feature | null>(null);
    const [activeTab, setActiveTab] = useState("all");

    const filteredFeatures = useMemo(() => {
        return features.filter((f) => {
            if (nameFilter && !f.name.toLowerCase().includes(nameFilter.toLowerCase())) return false;
            if (descFilter && !f.description.toLowerCase().includes(descFilter.toLowerCase()))
                return false;
            if (statusFilter !== "all" && f.status !== statusFilter) return false;
            if (categoryFilter !== "all" && f.category !== categoryFilter) return false;
            if (creatorFilter && !f.creator.toLowerCase().includes(creatorFilter.toLowerCase()))
                return false;
            if (activeTab === "shared" && !f.isShared) return false;
            if (activeTab === "online" && f.status !== "online") return false;
            if (activeTab === "offline" && f.status !== "offline") return false;
            return true;
        });
    }, [features, nameFilter, descFilter, statusFilter, categoryFilter, creatorFilter, activeTab]);

    const handleReset = () => {
        setNameFilter("");
        setDescFilter("");
        setStatusFilter("all");
        setCategoryFilter("all");
        setCreatorFilter("");
    };

    const handleConfirmDelete = () => {
        if (deleteDialog) {
            onDelete(deleteDialog.id);
            setDeleteDialog(null);
        }
    };

    const tabs = [
        { key: "all", label: "All Features" },
        { key: "online", label: "Online" },
        { key: "offline", label: "Offline" },
        { key: "shared", label: "Shared" },
    ];

    return (
        <div className="flex flex-col gap-6">
            {/* Search Filters */}
            <div className="rounded-xl border border-border bg-card p-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Feature Name</Label>
                        <Input
                            placeholder="Enter feature name"
                            value={nameFilter}
                            onChange={(e) => setNameFilter(e.target.value)}
                            className="h-9 bg-muted/30 text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Feature Description</Label>
                        <Input
                            placeholder="Enter description"
                            value={descFilter}
                            onChange={(e) => setDescFilter(e.target.value)}
                            className="h-9 bg-muted/30 text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Status</Label>
                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="h-9 bg-muted/30 text-sm">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="online">Online</SelectItem>
                                <SelectItem value="offline">Offline</SelectItem>
                                <SelectItem value="testing">Testing</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Feature Category</Label>
                        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                            <SelectTrigger className="h-9 bg-muted/30 text-sm">
                                <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                {FEATURE_CATEGORIES.map((c) => (
                                    <SelectItem key={c} value={c}>
                                        {c}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="flex flex-col gap-1.5">
                        <Label className="text-xs font-medium text-muted-foreground">Creator</Label>
                        <Input
                            placeholder="Enter creator"
                            value={creatorFilter}
                            onChange={(e) => setCreatorFilter(e.target.value)}
                            className="h-9 bg-muted/30 text-sm"
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <Button size="sm" className="h-9 gap-1.5" onClick={() => { }}>
                            <Search className="h-3.5 w-3.5" />
                            Search
                        </Button>
                        <Button size="sm" variant="outline" className="h-9 gap-1.5 bg-transparent" onClick={handleReset}>
                            <RotateCcw className="h-3.5 w-3.5" />
                            Reset
                        </Button>
                        {hasPermission(user, "feature:create") && (
                            <Button size="sm" className="h-9 gap-1.5" onClick={onCreateNew}>
                                <Plus className="h-3.5 w-3.5" />
                                New
                            </Button>
                        )}
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 rounded-lg bg-muted/50 p-1 self-start">
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${activeTab === tab.key
                                ? "bg-card text-foreground shadow-sm"
                                : "text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted/30 hover:bg-muted/30">
                                <TableHead className="text-xs font-semibold text-muted-foreground">Feature Name</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Description</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Type</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Category</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Status</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Risk Level</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Shared</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Creator</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Created</TableHead>
                                <TableHead className="text-xs font-semibold text-muted-foreground">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredFeatures.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={10} className="py-12 text-center text-sm text-muted-foreground">
                                        No features found matching your criteria
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredFeatures.map((feature) => (
                                    <TableRow key={feature.id} className="hover:bg-muted/20">
                                        <TableCell className="text-sm font-medium text-foreground">
                                            {feature.name}
                                        </TableCell>
                                        <TableCell className="max-w-[160px] truncate text-sm text-muted-foreground">
                                            {feature.description}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline" className="text-xs font-mono">
                                                {feature.type}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{feature.category}</TableCell>
                                        <TableCell>
                                            <Badge variant={STATUS_MAP[feature.status]?.variant || "secondary"} className="text-xs">
                                                {STATUS_MAP[feature.status]?.label || feature.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <span
                                                className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${RISK_MAP[feature.riskLevel]?.className}`}
                                            >
                                                {RISK_MAP[feature.riskLevel]?.label || feature.riskLevel}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">
                                            {feature.isShared ? "Yes" : "No"}
                                        </TableCell>
                                        <TableCell className="text-sm text-muted-foreground">{feature.creator}</TableCell>
                                        <TableCell className="text-xs text-muted-foreground whitespace-nowrap">
                                            {feature.createdAt}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-1">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-7 w-7 text-primary hover:bg-primary/10"
                                                    onClick={() => onEdit(feature)}
                                                    title="View / Edit"
                                                >
                                                    <Eye className="h-3.5 w-3.5" />
                                                </Button>
                                                {hasPermission(user, "feature:create") && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-muted-foreground hover:bg-muted"
                                                        title="Duplicate"
                                                        onClick={() => {
                                                            const dup: Feature = {
                                                                ...feature,
                                                                id: String(Date.now()),
                                                                name: `${feature.name}_copy`,
                                                                createdAt: new Date().toLocaleString(),
                                                            };
                                                            onEdit(dup);
                                                        }}
                                                    >
                                                        <Copy className="h-3.5 w-3.5" />
                                                    </Button>
                                                )}
                                                {hasPermission(user, "feature:delete") && (
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-7 w-7 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                                                        title="Delete"
                                                        onClick={() => setDeleteDialog(feature)}
                                                    >
                                                        <Trash2 className="h-3.5 w-3.5" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-border px-4 py-3">
                    <span className="text-xs text-muted-foreground">
                        Showing {filteredFeatures.length} of {features.length} features
                    </span>
                </div>
            </div>

            {/* Delete Confirm Dialog */}
            <Dialog open={!!deleteDialog} onOpenChange={() => setDeleteDialog(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Feature</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete <strong>{deleteDialog?.name}</strong>? This action
                            cannot be undone.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialog(null)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleConfirmDelete}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
