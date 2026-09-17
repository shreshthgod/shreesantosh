import { products } from "@/data/products";
import { SceneCanvas } from "@/components/three/scene-canvas";
import { ArrowIcon } from "@/components/tonalli-icons";

export function Hero() {
  return (
    <section id="home" className="relative h-svh min-h-[640px] overflow-hidden bg-black text-white">
      <SceneCanvas name="pod" />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent lg:inset-x-0 lg:top-auto lg:h-1/2 lg:from-black/50 lg:via-transparent" />

      <div className="absolute inset-x-0 top-[51%] grid grid-cols-1 gap-[42px] px-5 lg:top-[58.4%] lg:grid-cols-[348px_348px] lg:gap-0 lg:px-[30px]">
        <div>
          <h1 className="text-sm font-medium uppercase leading-[14px]">Who we are</h1>
          <a
            href="#about"
            className="mt-[15px] block max-w-[235px] text-xs leading-[16.8px] transition-opacity hover:opacity-70"
          >
            Independent poppy seed supplier. Quality selected, carefully processed and reliably
            supplied — for distributors, food makers and export buyers…
          </a>
        </div>

        <div>
          <h2 className="text-sm font-medium uppercase leading-[14px]">Our grades</h2>
          <ul className="mt-[15px]">
            {products.map((product) => (
              <li key={product.id}>
                <a href={`#grade-${product.id}`} className="group/arrow relative block h-[17px] text-xs leading-[16.8px]">
                  <span className="flex -translate-x-[17px] items-center gap-1 transition-transform duration-[400ms] ease-tonalli group-hover/arrow:translate-x-0">
                    <ArrowIcon className="opacity-0 transition-opacity duration-[400ms] ease-tonalli group-hover/arrow:opacity-100" />
                    <span>
                      {product.name} — {product.category}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
