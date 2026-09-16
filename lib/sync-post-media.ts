import { prisma } from "@/lib/prisma";

export interface PostMediaInput {
  mediaId: string;
  caption?: string;
}

export async function syncPostMedia(postId: string, items: PostMediaInput[]) {
  await prisma.postMedia.deleteMany({ where: { postId } });
  if (!items.length) return;

  await prisma.postMedia.createMany({
    data: items.map((item, i) => ({
      postId,
      mediaId: item.mediaId,
      caption: item.caption?.trim() || null,
      sortOrder: i,
    })),
  });
}
