import Navbar from "@/components/navbar";
import Plain3D from "@/components/plain3D";
import Home from "./page";

export default function HomeLayout() {
  return (
    <>
      <Navbar />

      <Plain3D
        content={<Home is3d={true} key="home3d" />}
        scrollProxy={<Home is3d={false} key="homeScroll" />}
      />
    </>
  );
}
