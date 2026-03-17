'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { FileText, Plus, Trash2, Loader2 } from 'lucide-react'
import { EmptyState } from '@/components/ui/EmptyState'
import { fetchResumes, createResume, deleteResume } from '@/lib/api-client'

export default function ResumesPage() {
  const [resumes, setResumes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [title, setTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    loadResumes()
  }, [])

  const loadResumes = async () => {
    try {
      const data = await fetchResumes()
      setResumes(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    setSaving(true)
    setError('')
    try {
      const newResume = await createResume({ title: title.trim() })
      setResumes(prev => [newResume, ...prev])
      setTitle('')
      setShowForm(false)
    } catch (e: any) {
      setError(e.message || 'Не удалось создать резюме')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Удалить резюме?')) return
    try {
      await deleteResume(id)
      setResumes(prev => prev.filter(r => r.id !== id))
    } catch (e) {
      console.error(e)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Мои резюме</h1>
          <p className="text-muted-foreground mt-2">Управляйте своими резюме</p>
        </div>
        <Button onClick={() => setShowForm(v => !v)}>
          <Plus className="w-4 h-4 mr-2" />
          Добавить резюме
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardContent className="p-6">
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <Label htmlFor="resume-title">Название резюме</Label>
                <Input
                  id="resume-title"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  placeholder="например: Разработчик Python, Senior Backend"
                  required
                />
              </div>
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex gap-3">
                <Button type="submit" disabled={saving}>
                  {saving ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  Сохранить
                </Button>
                <Button type="button" variant="outline" onClick={() => { setShowForm(false); setError('') }}>
                  Отмена
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {resumes.length === 0 ? (
        <EmptyState
          icon={FileText}
          title="Резюме ещё не добавлены"
          description="Создайте первое резюме, чтобы начать откликаться на вакансии"
        />
      ) : (
        <div className="space-y-4">
          {resumes.map((resume: any) => (
            <Card key={resume.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold">{resume.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        Добавлено {new Date(resume.created_at).toLocaleDateString('ru-RU')}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                    onClick={() => handleDelete(resume.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
