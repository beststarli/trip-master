import React from "react"

import { useState } from "react";
import {
    Select,
    SelectItem,
    SelectValue,
    SelectContent,
    SelectTrigger,
} from "@/components/ui/select"
import type { User } from "@/utils/auth"
import type { Feature } from "@/utils/data"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { hasPermission } from "@/utils/auth"
import { ArrowLeft, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { FEATURE_CATEGORIES, FEATURE_TYPES } from "@/utils/data"

interface FeatureFormProps {
    feature: Feature | null;
    user: User;
    onSave: (feature: Feature) => void;
    onBack: () => void;
}

export function FeatureForm({ feature, user, onSave, onBack }: FeatureFormProps) {
    const isEdit = !!feature;
    const canEdit = hasPermission(user, "feature:edit") || hasPermission(user, "feature:create");

    const [form, setForm] = useState({
        name: feature?.name || "",
        description: feature?.description || "",
        category: feature?.category || "",
        type: feature?.type || "",
        defaultValue: feature?.defaultValue || "",
        remark: feature?.remark || "",
        status: feature?.status || "testing",
        riskLevel: feature?.riskLevel || "low",
        isShared: feature?.isShared || false,
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = "Feature name is required";
        if (!form.description.trim()) errs.description = "Description is required";
        if (!form.category) errs.category = "Please select a category";
        if (!form.type) errs.type = "Please select a data type";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        const data: Feature = {
            id: feature?.id || String(Date.now()),
            name: form.name,
            description: form.description,
            type: form.type as Feature["type"],
            category: form.category,
            status: form.status as Feature["status"],
            riskLevel: form.riskLevel as Feature["riskLevel"],
            isShared: form.isShared,
            creator: feature?.creator || user.username,
            updater: user.username,
            createdAt: feature?.createdAt || new Date().toLocaleString(),
            defaultValue: form.defaultValue,
            remark: form.remark,
        };

        onSave(data);
    };

    return (
        <div className="mx-auto max-w-2xl">
            {/* Header */}
            <div className="mb-6 flex items-center gap-3">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onBack}>
                    <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                    <h3 className="text-lg font-semibold text-foreground">
                        {isEdit ? "Edit Feature" : "Create Feature"}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                        {isEdit ? "Update the feature configuration" : "Fill in the information below to create a new feature"}
                    </p>
                </div>
            </div>

            {/* Form Card */}
            <form onSubmit={handleSubmit}>
                <div className="rounded-xl border border-border bg-card p-6">
                    <h4 className="mb-5 text-sm font-semibold text-foreground">Basic Information</h4>

                    <div className="flex flex-col gap-5">
                        {/* Feature Name */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">
                                <span className="text-destructive">*</span> Feature Name
                            </Label>
                            <Input
                                placeholder="Enter feature name (e.g. user_age)"
                                value={form.name}
                                onChange={(e) => setForm({ ...form, name: e.target.value })}
                                disabled={!canEdit}
                                className={`h-10 ${errors.name ? "border-destructive" : ""}`}
                            />
                            {errors.name && <span className="text-xs text-destructive">{errors.name}</span>}
                        </div>

                        {/* Description */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">
                                <span className="text-destructive">*</span> Feature Description
                            </Label>
                            <Input
                                placeholder="Enter feature description"
                                value={form.description}
                                onChange={(e) => setForm({ ...form, description: e.target.value })}
                                disabled={!canEdit}
                                className={`h-10 ${errors.description ? "border-destructive" : ""}`}
                            />
                            {errors.description && (
                                <span className="text-xs text-destructive">{errors.description}</span>
                            )}
                        </div>

                        {/* Category */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">
                                <span className="text-destructive">*</span> Feature Category
                            </Label>
                            <Select
                                value={form.category}
                                onValueChange={(v) => setForm({ ...form, category: v })}
                                disabled={!canEdit}
                            >
                                <SelectTrigger className={`h-10 ${errors.category ? "border-destructive" : ""}`}>
                                    <SelectValue placeholder="Select a category" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FEATURE_CATEGORIES.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.category && (
                                <span className="text-xs text-destructive">{errors.category}</span>
                            )}
                        </div>

                        {/* Data Type */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">
                                <span className="text-destructive">*</span> Data Type
                            </Label>
                            <Select
                                value={form.type}
                                onValueChange={(v) => setForm({ ...form, type: v })}
                                disabled={!canEdit}
                            >
                                <SelectTrigger className={`h-10 ${errors.type ? "border-destructive" : ""}`}>
                                    <SelectValue placeholder="Select data type" />
                                </SelectTrigger>
                                <SelectContent>
                                    {FEATURE_TYPES.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            {errors.type && <span className="text-xs text-destructive">{errors.type}</span>}
                        </div>

                        {/* Status */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">Status</Label>
                            <Select
                                value={form.status}
                                onValueChange={(v) => setForm({ ...form, status: v as Feature["status"] })}
                                disabled={!canEdit}
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="online">Online</SelectItem>
                                    <SelectItem value="offline">Offline</SelectItem>
                                    <SelectItem value="testing">Testing</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Risk Level */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">Risk Level</Label>
                            <Select
                                value={form.riskLevel}
                                onValueChange={(v) => setForm({ ...form, riskLevel: v as Feature["riskLevel"] })}
                                disabled={!canEdit}
                            >
                                <SelectTrigger className="h-10">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Default Value */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">Default Value</Label>
                            <Input
                                placeholder="Enter default value (leave empty for null)"
                                value={form.defaultValue}
                                onChange={(e) => setForm({ ...form, defaultValue: e.target.value })}
                                disabled={!canEdit}
                                className="h-10"
                            />
                        </div>

                        {/* Shared */}
                        <div className="flex items-center gap-3">
                            <Label className="text-sm font-medium text-foreground">Shared</Label>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={form.isShared}
                                onClick={() => canEdit && setForm({ ...form, isShared: !form.isShared })}
                                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors ${form.isShared ? "bg-primary" : "bg-input"
                                    }`}
                            >
                                <span
                                    className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-card shadow-lg ring-0 transition-transform ${form.isShared ? "translate-x-5" : "translate-x-0"
                                        }`}
                                />
                            </button>
                        </div>

                        {/* Remark */}
                        <div className="flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-foreground">Remarks</Label>
                            <Textarea
                                placeholder="Enter remarks"
                                value={form.remark}
                                onChange={(e) => setForm({ ...form, remark: e.target.value })}
                                disabled={!canEdit}
                                rows={4}
                                className="resize-none"
                            />
                        </div>
                    </div>
                </div>

                {/* Actions */}
                {canEdit && (
                    <div className="mt-6 flex items-center justify-end gap-3">
                        <Button type="button" variant="outline" onClick={onBack}>
                            Cancel
                        </Button>
                        <Button type="submit" className="gap-1.5">
                            <Save className="h-4 w-4" />
                            {isEdit ? "Save Changes" : "Create Feature"}
                        </Button>
                    </div>
                )}
            </form>
        </div>
    );
}
