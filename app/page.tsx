import Brands from "@/components/Brands";
import Content from "@/components/Content";
import Expertise from "@/components/Expertise";
import Hero from "@/components/Hero";
import StackedScroll from "@/components/StackedScroll";

export default function Home() {
  return (
    <div>
      <Hero />
      <StackedScroll />
      <Expertise />
      <Content />
      <Brands />
    </div>
  );
}
