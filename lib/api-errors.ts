export function formatApiError(error: unknown): string {
  if (typeof error === "string") return error;
  if (error && typeof error === "object") {
    const record = error as Record<string, unknown>;
    if (typeof record.message === "string") return record.message;
    if (typeof record.error === "string") return record.error;
    if (record.fieldErrors && typeof record.fieldErrors === "object") {
      const messages = Object.values(record.fieldErrors as Record<string, string[]>)
        .flat()
        .filter(Boolean);
      if (messages.length > 0) return messages.join(", ");
    }
    if (record.formErrors && Array.isArray(record.formErrors)) {
      const messages = record.formErrors.filter((item) => typeof item === "string");
      if (messages.length > 0) return messages.join(", ");
    }
  }
  return "Request failed";
}
