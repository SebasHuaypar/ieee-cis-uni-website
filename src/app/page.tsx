import Hero from "@/components/home/Hero";
import About from "@/components/home/About";
import Team from "@/components/home/Team";
import Projects from "@/components/home/Projects";
import Events from "@/components/home/Events";
import Blog from "@/components/home/Blog";
import Reveal from "@/components/ui/Reveal";

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal><About /></Reveal>
      <Reveal><Team /></Reveal>
      <Reveal><Projects /></Reveal>
      <Reveal><Events /></Reveal>
      <Reveal><Blog /></Reveal>
    </>
  );
}
