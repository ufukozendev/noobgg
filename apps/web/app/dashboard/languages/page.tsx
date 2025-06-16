"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Plus, Search, Edit, Trash2, Globe } from "lucide-react";
import {
  useLanguages,
  useCreateLanguage,
  useUpdateLanguage,
  useDeleteLanguage,
} from "@/features/languages/api/use-languages";
import { LanguageForm } from "@/components/admin/language-form";
import type { Language } from "@/types/language";
import { toast } from "react-toastify";
import { useDebounce } from "@/hooks/use-debounce";
import { useSession } from "next-auth/react";

export default function LanguagesPage() {
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const search = useDebounce(searchInput, 300);
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [deletingLanguage, setDeletingLanguage] = useState<Language | null>(
    null
  );
  const [editingLanguage, setEditingLanguage] = useState<Language | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);
  const { data: session } = useSession();
  const isAdmin = (session?.user as { isAdmin?: boolean })?.isAdmin ?? false;

  const {
    data,
    isLoading: loading,
    error,
    refetch,
  } = useLanguages({
    page,
    limit: 10,
    search,
    sortBy,
    sortOrder,
  });
  const createLanguageMutation = useCreateLanguage();
  const updateLanguageMutation = useUpdateLanguage(editingLanguage?.id || "");
  const deleteLanguageMutation = useDeleteLanguage();

  const languages = data?.data || [];
  const pagination = data?.pagination || {
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 1,
  };

  const handleCreate = async (form: {
    name: string;
    code: string;
    flagUrl?: string;
  }) => {
    try {
      setIsFormLoading(true);
      await createLanguageMutation.mutateAsync(form);
      setIsCreateDialogOpen(false);
      toast.success("Language created successfully!");
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to create language");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleUpdate = async (form: {
    name: string;
    code: string;
    flagUrl?: string;
  }) => {
    if (!editingLanguage) return;
    try {
      setIsFormLoading(true);
      await updateLanguageMutation.mutateAsync(form);
      setEditingLanguage(null);
      toast.success("Language updated successfully!");
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to update language");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!deletingLanguage) return;
    try {
      setIsFormLoading(true);
      await deleteLanguageMutation.mutateAsync(id);
      setDeletingLanguage(null);
      toast.success("Language deleted successfully!");
      refetch();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to delete language");
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleSort = (column: string) => {
    if (sortBy === column) setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  if (error) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="pt-6">
            <p className="text-red-500">
              Error: {error.message || error.toString()}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Languages Management</h1>
          <p className="text-muted-foreground">
            Manage available languages for the platform
          </p>
        </div>
        {isAdmin && (
          <Dialog
            open={isCreateDialogOpen}
            onOpenChange={setIsCreateDialogOpen}
          >
            <DialogTrigger>
              <Button size="sm" variant="default">
                <Plus className="h-4 w-4 mr-2" />
                Add Language
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Language</DialogTitle>
              </DialogHeader>
              <LanguageForm
                onSubmit={handleCreate}
                onCancel={() => setIsCreateDialogOpen(false)}
                isLoading={isFormLoading}
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search languages..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="pl-10"
              />
            </div>
            <Badge variant="secondary">
              {pagination.total} total languages
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading languages...</div>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead
                      onClick={() => handleSort("name")}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      Name{" "}
                      {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead
                      onClick={() => handleSort("code")}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      Code{" "}
                      {sortBy === "code" && (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead>Flag</TableHead>
                    <TableHead
                      onClick={() => handleSort("createdAt")}
                      className="cursor-pointer hover:bg-muted/50"
                    >
                      Created{" "}
                      {sortBy === "createdAt" &&
                        (sortOrder === "asc" ? "↑" : "↓")}
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {languages.map((lang) => (
                    <TableRow key={lang.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Globe className="h-4 w-4 text-muted-foreground" />{" "}
                          {lang.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{lang.code}</Badge>
                      </TableCell>
                      <TableCell>
                        {lang.flagUrl ? (
                          <Image
                            src={lang.flagUrl}
                            alt={`${lang.name} flag`}
                            width={32}
                            height={24}
                            className="h-6 w-8 object-cover rounded"
                            unoptimized
                          />
                        ) : (
                          <span className="text-muted-foreground text-sm">
                            No flag
                          </span>
                        )}
                      </TableCell>
                      <TableCell>
                        {lang.createdAt
                          ? new Date(lang.createdAt).toLocaleDateString()
                          : "-"}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          {/* Edit */}
                          <Dialog
                            open={editingLanguage?.id === lang.id}
                            onOpenChange={(o) => !o && setEditingLanguage(null)}
                          >
                            <DialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => setEditingLanguage(lang)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Edit Language</DialogTitle>
                              </DialogHeader>
                              <LanguageForm
                                language={lang}
                                onSubmit={handleUpdate}
                                onCancel={() => setEditingLanguage(null)}
                                isLoading={isFormLoading}
                              />
                            </DialogContent>
                          </Dialog>

                          {/* Delete */}
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-600 hover:text-red-700"
                                onClick={() => setDeletingLanguage(lang)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </AlertDialogTrigger>
                            {deletingLanguage?.id === lang.id && (
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Language
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete &quot;
                                    {lang.name}&quot;? This action cannot be
                                    undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel
                                    onClick={() => setDeletingLanguage(null)}
                                  >
                                    Cancel
                                  </AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() => handleDelete(lang.id)}
                                    className="bg-red-600 hover:bg-red-700"
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            )}
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-6">
                <p className="text-sm text-muted-foreground">
                  Showing {(page - 1) * 10 + 1} to{" "}
                  {Math.min(page * 10, pagination.total)} of {pagination.total}{" "}
                  languages
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                  >
                    Prev
                  </Button>
                  {Array.from(
                    { length: pagination.totalPages },
                    (_, i) => i + 1
                  ).map((p) => (
                    <Button
                      key={p}
                      variant={p === page ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPage(p)}
                    >
                      {p}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= pagination.totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
