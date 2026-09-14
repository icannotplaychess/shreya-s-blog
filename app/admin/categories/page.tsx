"use client";

import { useEffect, useState } from "react";

interface Category {
  id: string;
  name: string;
  slug: string;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");

  async function load() {
    const res = await fetch("/api/categories");
    if (res.ok) setCategories(await res.json());
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    setName("");
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <form onSubmit={handleCreate} className="flex gap-2 mb-6 max-w-md">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="New category name"
          className="flex-1 px-3 py-2 border border-slate-300 rounded-lg text-sm"
        />
        <button type="submit" className="px-4 py-2 bg-pink-600 text-white rounded-lg text-sm">
          Add
        </button>
      </form>

      <ul className="bg-white border border-slate-200 rounded-lg divide-y divide-slate-100">
        {categories.map((cat) => (
          <li key={cat.id} className="px-4 py-3 flex justify-between">
            <span className="font-medium">{cat.name}</span>
            <span className="text-xs text-slate-400 font-mono">{cat.slug}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
