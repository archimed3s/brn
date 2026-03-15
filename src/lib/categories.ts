export type DocumentCategory = {
  id: number;
  name: string;
  user_id: string | null;
  description: string | null;
  parent_id: number | null;
  children: DocumentCategory[];
};

export const countAllCategories = (tree: DocumentCategory[]): number => {
  let n = 0;
  const walk = (nodes: DocumentCategory[]) => {
    for (const node of nodes) {
      n += 1;
      if (node.children.length > 0) walk(node.children);
    }
  };
  walk(tree);
  return n;
};

export const countCategoryDescendants = (node: DocumentCategory): number => {
  let n = 0;
  const walk = (nodes: DocumentCategory[]) => {
    for (const child of nodes) {
      n += 1;
      if (child.children.length > 0) walk(child.children);
    }
  };
  walk(node.children);
  return n;
};

export type FlattenedCategory = {
  id: number;
  name: string;
  count: number;
  depth: number;
};

export const flattenCategories = (
  tree: DocumentCategory[],
  depth = 0,
): FlattenedCategory[] => {
  const out: FlattenedCategory[] = [];
  const walk = (nodes: DocumentCategory[], d: number) => {
    for (const node of nodes) {
      out.push({
        id: node.id,
        name: node.name,
        count: countCategoryDescendants(node),
        depth: d,
      });
      if (node.children.length > 0) walk(node.children, d + 1);
    }
  };
  walk(tree, depth);
  return out;
};

export const flattenSubcategoriesOnly = (
  tree: DocumentCategory[],
): FlattenedCategory[] =>
  tree.flatMap((root) => flattenCategories(root.children, 0));

export const countSubcategoriesOnly = (tree: DocumentCategory[]): number =>
  tree.reduce((n, root) => n + countAllCategories(root.children), 0);

export const findCategoryWithParent = (
  tree: DocumentCategory[],
  id: number,
): { category: DocumentCategory; parent: DocumentCategory | null } | null => {
  for (const node of tree) {
    if (node.id === id) return { category: node, parent: null };
    for (const child of node.children) {
      if (child.id === id) return { category: child, parent: node };
    }
  }
  return null;
};

const collectIds = (node: DocumentCategory): number[] => {
  const ids = [node.id];
  for (const child of node.children) {
    ids.push(...collectIds(child));
  }
  return ids;
};

export const getCategoryAndDescendantIds = (
  tree: DocumentCategory[],
  categoryId: number,
): number[] => {
  const found = findCategoryWithParent(tree, categoryId);
  if (found == null) return [];
  return collectIds(found.category);
};
