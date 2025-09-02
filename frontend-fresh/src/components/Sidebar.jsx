import React from "react";

export default function Sidebar({ categories = ["All"], active = "All", onSelect }) {
  return (
    <aside className="w-60 shrink-0 rounded-lg bg-white p-4 shadow">
      <h2 className="mb-3 text-lg font-semibold">Categories</h2>
      <ul className="space-y-1">
        {categories.map(cat => (
          <li key={cat}>
            <button
              onClick={() => onSelect(cat)}
              className={`w-full rounded px-2 py-1 text-left hover:bg-amber-50 ${
                active === cat ? "bg-amber-100 font-medium" : ""
              }`}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
