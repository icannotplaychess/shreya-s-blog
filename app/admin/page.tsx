import Link from "next/link";
import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ContentType, PostStatus } from "@/generated/prisma/client";

export default async function AdminDashboard() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [totalPosts, drafts, published, mediaCount, recentPosts] = await Promise.all([
    prisma.post.count(),
    prisma.post.count({ where: { status: PostStatus.DRAFT } }),
    prisma.post.count({ where: { status: PostStatus.PUBLISHED } }),
    prisma.media.count(),
    prisma.post.findMany({
      take: 5,
      orderBy: { updatedAt: "desc" },
      include: { coverImage: true },
    }),
  ]);

  const typeCounts = await prisma.post.groupBy({
    by: ["type"],
    _count: true,
    where: { status: PostStatus.PUBLISHED },
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500 text-sm">Welcome back, {session.user?.name || session.user?.email}</p>
        </div>
        <Link
          href="/admin/posts/new"
          className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-lg font-medium text-sm"
        >
          + New Post
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Total posts", value: totalPosts },
          { label: "Published", value: published },
          { label: "Drafts", value: drafts },
          { label: "Media files", value: mediaCount },
        ].map((stat) => (
          <div key={stat.label} className="bg-white rounded-lg border border-slate-200 p-4">
            <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {typeCounts.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-4 mb-8">
          <h2 className="font-semibold mb-3">Published by type</h2>
          <div className="flex flex-wrap gap-2">
            {typeCounts.map((t) => (
              <span key={t.type} className="px-3 py-1 bg-pink-50 text-pink-700 rounded-full text-sm">
                {t.type.replace("_", " ")}: {t._count}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200">
        <div className="px-4 py-3 border-b border-slate-200 flex justify-between items-center">
          <h2 className="font-semibold">Recent posts</h2>
          <Link href="/admin/posts" className="text-sm text-pink-600 hover:underline">View all</Link>
        </div>
        <ul className="divide-y divide-slate-100">
          {recentPosts.length === 0 ? (
            <li className="px-4 py-8 text-center text-slate-500 text-sm">
              No posts yet.{" "}
              <Link href="/admin/posts/new" className="text-pink-600 hover:underline">Create your first post</Link>
            </li>
          ) : (
            recentPosts.map((post) => (
              <li key={post.id} className="px-4 py-3 flex items-center justify-between gap-4">
                <div>
                  <Link href={`/admin/posts/${post.id}/edit`} className="font-medium hover:text-pink-600">
                    {post.title}
                  </Link>
                  <p className="text-xs text-slate-500">
                    {post.type} · {post.status} · {new Date(post.updatedAt).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    post.status === PostStatus.PUBLISHED
                      ? "bg-green-100 text-green-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {post.status}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
        {Object.values(ContentType).map((type) => (
          <Link
            key={type}
            href={`/admin/posts/new?type=${type}`}
            className="p-4 bg-white border border-slate-200 rounded-lg hover:border-pink-300 hover:shadow-sm text-sm"
          >
            <span className="font-medium">+ New {type.replace("_", " ").toLowerCase()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
