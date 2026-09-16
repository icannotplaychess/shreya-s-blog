import { CmsPostFeed } from "@/components/content/CmsPostFeed";
import { EditablePageHeader } from "@/components/ui/EditablePageHeader";

export default function BlogPage() {
  return (
    <div className="py-4">
      <EditablePageHeader page="blog" />
      <CmsPostFeed type="BLOG" title="LATEST FROM SHANKIE'S" />
    </div>
  );
}
