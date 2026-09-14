import { CmsPostFeed } from "@/components/content/CmsPostFeed";
import { PageHeader } from "@/components/ui/PageHeader";

export default function BlogPage() {
  return (
    <div className="py-4">
      <PageHeader title="Blog" subtitle="essays, stories & random thoughts ~" />
      <CmsPostFeed type="BLOG" title="LATEST FROM SHANKIE'S" />
    </div>
  );
}
