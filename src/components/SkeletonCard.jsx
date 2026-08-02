const RATIOS = ["3/4", "4/5", "1/1", "16/10", "3/4", "4/5"];

export default function SkeletonCard({ index = 0 }) {
  return (
    <div className="print-sheet rounded-[3px] p-2 pb-1.5">
      <div
        className="animate-pulse rounded-[2px] bg-darkroom-elevated"
        style={{ aspectRatio: RATIOS[index % RATIOS.length] }}
      />
      <div className="mt-1.5 flex justify-between px-0.5">
        <div className="h-2 w-24 animate-pulse rounded bg-darkroom-elevated" />
        <div className="h-2 w-14 animate-pulse rounded bg-darkroom-elevated" />
      </div>
    </div>
  );
}
