import { Node, mergeAttributes } from "@tiptap/core";

export const AudioBlock = Node.create({
  name: "audioBlock",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      title: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: "audio[src]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["audio", mergeAttributes(HTMLAttributes, { controls: "true", class: "w-full max-w-md my-4" })];
  },
});

export const VideoBlock = Node.create({
  name: "videoBlock",
  group: "block",
  atom: true,
  addAttributes() {
    return {
      src: { default: null },
      title: { default: null },
    };
  },
  parseHTML() {
    return [{ tag: "video[src]" }];
  },
  renderHTML({ HTMLAttributes }) {
    return ["video", mergeAttributes(HTMLAttributes, { controls: "true", class: "w-full max-w-lg my-4 rounded-lg" })];
  },
});
