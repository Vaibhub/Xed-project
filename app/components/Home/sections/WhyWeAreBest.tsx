import { CheckCircle } from "lucide-react";

export default function WhyWeAreBest() {
  const features = [
    {
      title: "Customized Executive Education",
      desc: "XED delivers tailored programs that address the specific needs of organizations, empowering leaders with targeted skills for impactful growth.",
    },
    {
      title: "Global Expertise and Partnerships",
      desc: "With faculty and partnerships from leading global institutions, XED offers insights from top industry experts and academic thought leaders.",
    },
    {
      title: "Flexible Learning Formats",
      desc: "Programs include a blend of in-person, online, and hybrid formats, providing accessible, immersive experiences that fit around professional commitments.",
    },
    {
      title: "Action-Oriented Learning",
      desc: "XED emphasizes practical application, equipping participants to immediately implement strategies and drive results within their organizations.",
    },
    {
      title: "Focus on Leadership and Innovation",
      desc: "XED programs develop critical leadership and innovation capabilities, helping executives drive transformation in a rapidly evolving business landscape.",
    },
    {
      title: "Extensive Professional Network",
      desc: "Participants join a network of high-achieving peers and alumni, fostering connections that support continuous learning and collaboration across industries.",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">

        {/* Heading */}
        <div className="text-center mb-12">
          <p className="text-[#2873B8] font-semibold text-lg">XED Advantage</p>
          <h2 className="text-3xl md:text-4xl font-bold mt-1">
            Why We're the Best
          </h2>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
          {features.map((item, index) => (
            <div key={index} className="flex items-start gap-4">
              <CheckCircle size={35} className="text-[#2873B8]" />
              <div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
