import { useState } from "react"
import {
    Table,
    TableRow,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
} from "@/components/ui/table"
import {
    Dialog,
    DialogTitle,
    DialogFooter,
    DialogHeader,
    DialogContent,
    DialogDescription,
} from "@/components/ui/dialog"
import { Save, Users } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"

interface UserPermission {
    username: string;
    role: "admin" | "editor" | "viewer";
    permissions: string[];
}

const ALL_PERMISSIONS = [
    { key: "feature:read", label: "Read Features", description: "View feature list and details" },
    { key: "feature:create", label: "Create Features", description: "Create new features" },
    { key: "feature:edit", label: "Edit Features", description: "Modify existing features" },
    { key: "feature:delete", label: "Delete Features", description: "Remove features" },
    { key: "permission:manage", label: "Manage Permissions", description: "View and edit user permissions" },
];

const ROLE_COLORS: Record<string, string> = {
    admin: "bg-primary text-primary-foreground",
    editor: "bg-amber-100 text-amber-800 border-amber-200",
    viewer: "bg-secondary text-secondary-foreground",
};

export function PermissionManagement() {
    const [users, setUsers] = useState<UserPermission[]>([
        {
            username: "admin",
            role: "admin",
            permissions: [
                "feature:read",
                "feature:create",
                "feature:edit",
                "feature:delete",
                "permission:manage",
            ],
        },
        {
            username: "editor",
            role: "editor",
            permissions: ["feature:read", "feature:create", "feature:edit"],
        },
        {
            username: "viewer",
            role: "viewer",
            permissions: ["feature:read"],
        },
    ]);

    const [editUser, setEditUser] = useState<UserPermission | null>(null);
    const [editPermissions, setEditPermissions] = useState<string[]>([]);
    const [saved, setSaved] = useState(false);

    const handleOpenEdit = (user: UserPermission) => {
        setEditUser(user);
        setEditPermissions([...user.permissions]);
        setSaved(false);
    };

    const togglePermission = (perm: string) => {
        setEditPermissions((prev) =>
            prev.includes(perm) ? prev.filter((p) => p !== perm) : [...prev, perm]
        );
    };

    const handleSave = () => {
        if (!editUser) return;
        setUsers((prev) =>
            prev.map((u) =>
                u.username === editUser.username ? { ...u, permissions: editPermissions } : u
            )
        );
        setSaved(true);
        setTimeout(() => {
            setEditUser(null);
            setSaved(false);
        }, 1000);
    };

    return (
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
                    <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Permission Management</h3>
                    <p className="text-sm text-muted-foreground">
                        Manage user roles and assign permissions
                    </p>
                </div>
            </div>

            {/* Users Table */}
            <div className="overflow-hidden rounded-xl border border-border bg-card">
                <Table>
                    <TableHeader>
                        <TableRow className="bg-muted/30 hover:bg-muted/30">
                            <TableHead className="text-xs font-semibold text-muted-foreground">Username</TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">Role</TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">Permissions</TableHead>
                            <TableHead className="text-xs font-semibold text-muted-foreground">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {users.map((u) => (
                            <TableRow key={u.username} className="hover:bg-muted/20">
                                <TableCell className="text-sm font-medium text-foreground">{u.username}</TableCell>
                                <TableCell>
                                    <Badge className={`text-xs ${ROLE_COLORS[u.role]}`}>{u.role}</Badge>
                                </TableCell>
                                <TableCell>
                                    <div className="flex flex-wrap gap-1">
                                        {u.permissions.map((p) => (
                                            <Badge key={p} variant="outline" className="text-xs">
                                                {ALL_PERMISSIONS.find((ap) => ap.key === p)?.label || p}
                                            </Badge>
                                        ))}
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-8 text-xs bg-transparent"
                                        onClick={() => handleOpenEdit(u)}
                                    >
                                        Edit Permissions
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            {/* Permission Descriptions */}
            <div className="rounded-xl border border-border bg-card p-5">
                <h4 className="mb-4 text-sm font-semibold text-foreground">Permission Reference</h4>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {ALL_PERMISSIONS.map((perm) => (
                        <div key={perm.key} className="flex flex-col gap-0.5 rounded-lg border border-border bg-muted/30 p-3">
                            <span className="text-sm font-medium text-foreground">{perm.label}</span>
                            <span className="text-xs text-muted-foreground">{perm.description}</span>
                            <code className="mt-1 text-xs text-primary">{perm.key}</code>
                        </div>
                    ))}
                </div>
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!editUser} onOpenChange={() => setEditUser(null)}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Edit Permissions - {editUser?.username}</DialogTitle>
                        <DialogDescription>
                            Select the permissions to assign to this user.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex flex-col gap-3 py-4">
                        {ALL_PERMISSIONS.map((perm) => (
                            <div key={perm.key} className="flex items-start gap-3">
                                <Checkbox
                                    id={perm.key}
                                    checked={editPermissions.includes(perm.key)}
                                    onCheckedChange={() => togglePermission(perm.key)}
                                />
                                <Label htmlFor={perm.key} className="flex flex-col gap-0.5 cursor-pointer">
                                    <span className="text-sm font-medium text-foreground">{perm.label}</span>
                                    <span className="text-xs text-muted-foreground">{perm.description}</span>
                                </Label>
                            </div>
                        ))}
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setEditUser(null)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} disabled={saved} className="gap-1.5">
                            {saved ? (
                                "Saved!"
                            ) : (
                                <>
                                    <Save className="h-3.5 w-3.5" />
                                    Save
                                </>
                            )}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
