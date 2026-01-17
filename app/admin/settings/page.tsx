import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-2">Manage your admin panel preferences</p>
      </div>

      <Card className="p-6 max-w-2xl">
        <div className="space-y-6">
          <div className="flex items-start justify-between pb-6 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900">Account Settings</h3>
              <p className="text-sm text-slate-600 mt-1">Manage your account preferences</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Edit</Button>
          </div>

          <div className="flex items-start justify-between pb-6 border-b border-slate-200">
            <div>
              <h3 className="font-bold text-slate-900">Notifications</h3>
              <p className="text-sm text-slate-600 mt-1">Control how you receive updates</p>
            </div>
            <Button variant="outline" className="border-slate-200 bg-transparent">
              Configure
            </Button>
          </div>

          <div className="flex items-start justify-between">
            <div>
              <h3 className="font-bold text-slate-900">Security</h3>
              <p className="text-sm text-slate-600 mt-1">Update your password and security settings</p>
            </div>
            <Button variant="outline" className="border-slate-200 bg-transparent">
              Update
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
