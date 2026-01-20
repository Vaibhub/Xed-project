"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, ImageIcon, Loader2 } from "lucide-react";
import { useState } from "react";
import {
  useUniversityLogos,
  useAddUniversityLogo,
  useDeleteUniversityLogo,
  useUpdateUniversityLogoStatus,
} from "@/app/hooks/useUniversityLogos";

export default function UniversityLogosPage() {
  const { data: logos = [], isLoading, isError } = useUniversityLogos();
  const addLogoMutation = useAddUniversityLogo();
  const deleteLogoMutation = useDeleteUniversityLogo();
  const updateStatusMutation = useUpdateUniversityLogoStatus();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", image_url: "" });

  const handleAddLogo = async () => {
    if (formData.name && formData.image_url) {
      await addLogoMutation.mutateAsync({
        name: formData.name,
        logo_url: formData.image_url,
        is_active: "Y", 
      });
      setFormData({ name: "", image_url: "" });
      setIsModalOpen(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this logo?")) {
      await deleteLogoMutation.mutateAsync(id);
    }
  };

  const handleToggleStatus = async (id: string, currentStatus: "Y" | "N") => {
    await updateStatusMutation.mutateAsync({
      id,
      status: currentStatus === "Y" ? false : true,
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600" size={40} />
      </div>
    );
  }

  if (isError) {
    return (
      <Card className="p-12 text-center text-red-600">
        <p>Error loading logos. Please try again later.</p>
      </Card>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">
            University Logos
          </h1>
          <p className="text-slate-600 mt-2">
            Manage university logos displayed on your website
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
        >
          <Plus size={20} />
          Add Logo
        </Button>
      </div>

      {/* Add Logo Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-md p-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Add University Logo
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  University Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., IIT Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Logo URL
                </label>
                <input
                  type="text"
                  value={formData.image_url}
                  onChange={(e) =>
                    setFormData({ ...formData, image_url: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button
                  onClick={() => setIsModalOpen(false)}
                  variant="outline"
                  className="border-slate-200"
                  disabled={addLogoMutation.isPending}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleAddLogo}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                  disabled={addLogoMutation.isPending}
                >
                  {addLogoMutation.isPending ? "Adding..." : "Add Logo"}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Logos Grid */}
      {logos.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {logos.map((logo) => (
            <Card
              key={logo.id}
              className="p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-24 bg-slate-100 rounded-lg mb-4 overflow-hidden">
                  {logo.logo_url ? (
                    <img
                      alt={logo.name || "University logo"}
                      src={logo.logo_url}
                      className="h-full w-full object-contain"
                    />
                  ) : (
                    <ImageIcon size={40} className="text-slate-400" />
                  )}
                </div>
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-bold text-slate-900">{logo.name}</h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      logo.is_active === "Y"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {logo.is_active === "Y" ? "Active" : "Inactive"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mb-4">
                  Added:{" "}
                  {logo.created_at
                    ? new Date(logo.created_at).toLocaleDateString()
                    : "N/A"}
                </p>
                <div className="flex gap-2 mt-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(logo.id, logo.is_active)}
                    disabled={updateStatusMutation.isPending}
                    className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-100"
                  >
                    {logo.is_active === "Y" ? "Deactivate" : "Activate"}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(logo.id)}
                    disabled={deleteLogoMutation.isPending}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    {deleteLogoMutation.isPending ? "Deleting..." : "Delete"}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">
            No logos yet
          </h3>
          <p className="text-slate-600">
            Get started by adding your first university logo
          </p>
        </Card>
      )}
    </div>
  );
}
