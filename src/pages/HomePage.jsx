import Featured from "./Featured";
import Gallery from "./Gallery";
import CategoryPills from "../components/CategoryPills";
import { CATEGORIES } from "../api/artic";

export default function HomePage() {
  return (
    <>
      <div className="mx-auto max-w-[1400px] px-4 pt-10 md:px-8 md:pt-14">
        <div className="mb-6">
          <h1 className="font-amharic text-3xl font-normal tracking-wide text-gallery-text md:text-5xl">
            Art Wallpapers
          </h1>
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-gallery-text-muted md:text-base">
            Curated masterpieces from the Art Institute of Chicago, free to use as wallpapers.
          </p>
        </div>
        <CategoryPills categories={CATEGORIES} active="all" />
      </div>
      <Featured />
      <div className="mx-auto max-w-[1400px] px-4 pt-12 md:px-8 md:pt-16">
        <Gallery standalone={false} />
      </div>
    </>
  );
}
