"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Language } from "@repo/shared";

interface Props {
  language?: Language;
  onSubmit: (data: { name: string; code: string; flagUrl?: string }) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function LanguageForm({ language, onSubmit, onCancel, isLoading }: Props) {
  const [formData, setFormData] = useState({
    name: language?.name || "",
    code: language?.code || "",
    flagUrl: language?.flagUrl || "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    else if (formData.name.length > 100) errs.name = "Max 100 chars";

    if (!formData.code.trim()) errs.code = "Code is required";
    else if (formData.code.length > 10) errs.code = "Max 10 chars";

    if (formData.flagUrl.trim()) {
      try {
        new URL(formData.flagUrl);
      } catch {
        errs.flagUrl = "Invalid URL";
      }
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    await onSubmit({
      name: formData.name.trim(),
      code: formData.code.trim().toLowerCase(),
      flagUrl: formData.flagUrl.trim() || undefined,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>{language ? "Edit Language" : "Add New Language"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="English"
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
          </div>

          {/* Code */}
          <div className="space-y-2">
            <Label htmlFor="code">Code *</Label>
            <Input
              id="code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
              placeholder="en"
              className={errors.code ? "border-red-500" : ""}
            />
            {errors.code && <p className="text-sm text-red-500">{errors.code}</p>}
          </div>

          {/* Flag URL */}
          <div className="space-y-2">
            <Label htmlFor="flagUrl">Flag URL</Label>
            <Input
              id="flagUrl"
              value={formData.flagUrl}
              onChange={(e) => setFormData({ ...formData, flagUrl: e.target.value })}
              placeholder="https://example.com/flag.png"
              className={errors.flagUrl ? "border-red-500" : ""}
            />
            {errors.flagUrl && <p className="text-sm text-red-500">{errors.flagUrl}</p>}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading ? "Saving..." : language ? "Update" : "Create"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
} 