import useLang from "../hooks/useLang";
import { text } from "../data/text";

export default function AboutSection() {

  const lang = useLang();

  return (
    <section className="py-24 lg:py-40 bg-white text-black px-6 lg:px-24">

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">

        {/* IMAGE */}
        <div className="aspect-square shadow-2xl overflow-hidden">

          <img
            src="/images/about.png"
            className="w-full h-full object-cover"
          />

        </div>

        {/* TEXT */}
        <div className="space-y-6">

          
<p className="tracking-[0.4em] text-sm text-[#c9a25b]">
  {text?.about?.tag?.[lang]}
</p>

<h2 className="text-4xl font-bold">
  {text?.about?.title?.[lang]}
</h2>

<p className="text-gray-600 leading-loose">
  {text?.about?.desc?.[lang]}
</p>

        </div>

      </div>

    </section>
  );
}