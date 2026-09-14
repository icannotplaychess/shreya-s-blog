export function parsePostMetadata<T>(metadata: string, fallback: T): T {
  try {
    return JSON.parse(metadata) as T;
  } catch {
    return fallback;
  }
}

export function parsePostContent(content: string) {
  try {
    return JSON.parse(content);
  } catch {
    return {
      type: "doc",
      content: [{ type: "paragraph", content: [{ type: "text", text: content }] }],
    };
  }
}
