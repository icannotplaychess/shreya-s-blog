import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostStatus } from "@/generated/prisma/client";

export default async function AdminPostsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; type?: string }>;
}) {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const params = await searchParams;
  const posts = await prisma.post.findMany({
    where: {
      ...(params.status ? { status: params.status as PostStatus } : {}),
    },
    include: { coverImage: true, categories: true },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Posts</h1>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg text-sm font-medium"
        >
          + New Post
        </Link>
      </div>

      <div className="flex gap-2 mb-4">
        {[
          { label: "All", href: "/admin/posts" },
          { label: "Published", href: "/admin/posts?status=PUBLISHED" },
          { label: "Drafts", href: "/admin/posts?status=DRAFT" },
        ].map((tab) => (
          <Link
            key={tab.href}
            href={tab.href}
            className={`px-3 py-1.5 rounded-lg text-sm ${
              (params.status ? tab.href.includes(params.status) : tab.label === "All")
                ? "bg-pink-100 text-pink-700"
                : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-50"
            }`}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="text-left px-4 py-3 font-medium text-slate-600">Title</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden sm:table-cell">Type</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Status</th>
              <th className="text-left px-4 py-3 font-medium text-slate-600 hidden md:table-cell">Updated</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-slate-50">
                <td className="px-4 py-3">
                  <Link href={`/admin/posts/${post.id}/edit`} className="font-medium hover:text-pink-600">
                    {post.title}
                  </Link>
                  {post.excerpt && <p className="text-xs text-slate-500 truncate max-w-xs">{post.excerpt}</p>}
                </td>
                <td className="px-4 py-3 text-slate-500 hidden sm:table-cell">{post.type}</td>
                <td className="px-4 py-3 hidden md:table-cell">
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      post.status === PostStatus.PUBLISHED
                        ? "bg-green-100 text-green-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-slate-500 hidden md:table-cell">
                  {new Date(post.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={4} className="px-4 py-12 text-center text-slate-500">
                  No posts found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
