import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { PostEditor } from "@/components/admin/PostEditor";

export default async function NewPostPage() {
  const session = await auth();
  if (!session) redirect("/admin/login");

  const [categories, tags] = await Promise.all([
    prisma.category.findMany({ orderBy: { name: "asc" } }),
    prisma.tag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">New Post</h1>
      <PostEditor categories={categories} tags={tags} />
    </div>
  );
}
