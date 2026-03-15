export const CategoriesPanelSkeleton = () => (
  <div className="flex flex-col gap-2 px-4 pb-5 pt-5" aria-busy="true">
    <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
    <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
    <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
    <div className="h-10 w-3/4 animate-pulse rounded-md bg-muted" />
  </div>
);
