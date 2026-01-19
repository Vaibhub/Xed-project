"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Edit2, Trash2, ImageIcon } from "lucide-react"
import { useState } from "react"

interface Logo {
  id: number
  name: string
  logo_url: string
  created_at: string
}

export default function UniversityLogosPage() {
  const [logos, setLogos] = useState<Logo[]>([
    {
      id: 1,
      name: "IIT Delhi",
      logo_url: "/iit-delhi-logo.png",
      created_at: "2024-01-15",
    },
    {
      id: 2,
      name: "IIT Mumbai",
      logo_url: "/iit-mumbai-logo.jpg",
      created_at: "2024-01-20",
    },
    {
      id: 3,
      name: "Delhi University",
      logo_url: "/delhi-university-logo.jpg",
      created_at: "2024-02-05",
    },
  ])

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formData, setFormData] = useState({ name: "", logo_url: "" })

  const handleAddLogo = () => {
    if (formData.name && formData.logo_url) {
      setLogos([
        ...logos,
        {
          id: Math.max(...logos.map((l) => l.id), 0) + 1,
          name: formData.name,
          logo_url: formData.logo_url,
          created_at: new Date().toISOString().split("T")[0],
        },
      ])
      setFormData({ name: "", logo_url: "" })
      setIsModalOpen(false)
    }
  }

  const handleDelete = (id: number) => {
    setLogos(logos.filter((logo) => logo.id !== id))
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">University Logos</h1>
          <p className="text-slate-600 mt-2">Manage university logos displayed on your website</p>
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
            <h2 className="text-xl font-bold text-slate-900 mb-4">Add University Logo</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">University Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="e.g., IIT Delhi"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">Logo URL</label>
                <input
                  type="text"
                  value={formData.logo_url}
                  onChange={(e) => setFormData({ ...formData, logo_url: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                  placeholder="https://..."
                />
              </div>
              <div className="flex gap-3 justify-end pt-4">
                <Button onClick={() => setIsModalOpen(false)} variant="outline" className="border-slate-200">
                  Cancel
                </Button>
                <Button onClick={handleAddLogo} className="bg-blue-600 hover:bg-blue-700 text-white">
                  Add Logo
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
            <Card key={logo.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-center h-24 bg-slate-100 rounded-lg mb-4">
                  <ImageIcon size={40} className="text-slate-400" />
                </div>
                <h3 className="font-bold text-slate-900 mb-1">{logo.name}</h3>
                <p className="text-xs text-slate-500 mb-4">Added: {logo.created_at}</p>
                <div className="flex gap-2 mt-auto">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-100 bg-transparent"
                  >
                    <Edit2 size={16} />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(logo.id)}
                    className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="p-12 text-center">
          <ImageIcon size={48} className="mx-auto text-slate-400 mb-4" />
          <h3 className="text-lg font-bold text-slate-900 mb-2">No logos yet</h3>
          <p className="text-slate-600">Get started by adding your first university logo</p>
        </Card>
      )}
    </div>
  )
}
