const images = {
  innovation:
    "https://xedinstitute.org/wp-content/uploads/2024/11/jpeg-5-e1661330619123.jpg",
  accountability:
    "https://xedinstitute.org/wp-content/uploads/2024/11/jpeg-6-e1661330846355.jpg",
  compassion:
    "https://xedinstitute.org/wp-content/uploads/2024/11/jpeg-7-e1661331028300.jpg",
  excellence:
    "https://xedinstitute.org/wp-content/uploads/2024/11/jpeg-8-e1661331179112.jpg",
};

const img =
  "https://xedinstitute.org/wp-content/uploads/2024/11/jpeg-2-e1661333178352.jpg";

const page = () => {
  return (
    <div className=" bg-white">
      <section className="bg-[rgb(40,115,184)] h-[30vh] min-h-[300px] flex items-center justify-center overflow-hidden">
        <h2 className="text-3xl md:text-4xl text-white lg:text-4xl font-bold leading-tight mb-4">
          Powering Global Executive Education
        </h2>
      </section>

      <section className="py-8 lg:py-8">
        <div className=" mx-auto px-6 lg:px-12">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="lg:w-1/3 md:w-full sm:w-full w-full">
              <div className="rounded-sm overflow-hidden shadow-2xl">
                <img
                  src="https://xedinstitute.org/wp-content/uploads/2024/11/jpeg-4-1.jpg"
                  alt="XED Leadership"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="lg:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-slate-900">
                Who we are?
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-6">
                Founded in 2015, XED is a leading provider of executive
                education in the Middle East, Far East, LATAM, and South Asia.
                Catering to the niche segment of senior leaders, XED offers open
                and custom programs for individuals and organizations. XED
                partners with Ivy Leagues and top global universities to offer
                high-impact programs in strategy, leadership, entrepreneurship,
                innovation, digital, and finance, delivered by world-renowned
                faculty. Leveraging technology and immersive learning formats,
                XED has empowered several senior leaders from diverse
                organizations, Fortune 500 companies, and global brands.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-16">
        <div className=" mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            <article className="bg-[rgb(40,115,184)] text-white rounded-xl p-8 sm:p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                Our Vision
              </h3>
              <p className="leading-relaxed text-base sm:text-lg">
                To empower global senior leaders with world-class executive
                education, fostering transformative leadership and innovation,
                driven by cutting-edge technology and unwavering commitment to
                excellence.
              </p>
            </article>

            {/* Mission */}
            <article className="bg-[rgb(40,115,184)] text-white rounded-xl p-8 sm:p-10 shadow-md hover:shadow-xl transition-shadow duration-300">
              <h3 className="text-2xl sm:text-3xl font-semibold mb-4">
                Our Mission
              </h3>
              <p className="leading-relaxed text-base sm:text-lg">
                To deliver open and customized executive education programs that
                foster transformational learning, empowering the next generation
                of business leaders and organizations for continued success.
              </p>
            </article>
          </div>

          {/* add vertical spacing below to match surrounding layout */}
          <div className="mt-12" />
        </div>
      </section>
      <section className="py-8 lg:py-8">
        <div className=" mx-auto px-16 py-16">
          {/* Heading */}
          <header className="mb-8">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
              Our Values
            </h2>
            <p className=" leading-relaxed ">
              At XED, we are driven by a profound belief in the boundless
              potential of the human spirit. In an ever-evolving world, we see
              challenges and opportunities for individuals and organizations to
              thrive, innovate, and adapt. Our core values — Excellence,
              Accountability, Compassion, and Innovation — serve as the guiding
              pillars of our mission to empower leaders through executive
              education. These values are not just words on a page; they are the
              essence of who we are and the principles that shape our every
              action.
            </p>
          </header>

          {/* Values grid: two columns, two items each */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-10">
            {/* Left column - Innovation */}
            <div className="flex items-start gap-6">
              <img
                src={images.innovation}
                alt="innovation"
                className="w-20 h-20 object-cover rounded-sm shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-[#2873b8] font-semibold text-lg mb-2">
                  Innovation:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Innovation is our response to change. We’re creative,
                  forward-thinking, and adaptable. By staying at the forefront
                  of education and technology, we empower leaders for a dynamic
                  world.
                </p>
              </div>
            </div>

            {/* Right column - Accountability */}
            <div className="flex items-start gap-6">
              <img
                src={images.accountability}
                alt="accountability"
                className="w-20 h-20 object-cover rounded-sm shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-[#2873b8] font-semibold text-lg mb-2">
                  Accountability:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Accountability is our promise. We take ownership, deliver on
                  commitments, and ensure excellence. It’s our way of driving
                  growth and progress.
                </p>
              </div>
            </div>

            {/* Left column - Compassion */}
            <div className="flex items-start gap-6">
              <img
                src={images.compassion}
                alt="compassion"
                className="w-20 h-20 object-cover rounded-sm shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-[#2873b8] font-semibold text-lg mb-2">
                  Compassion:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  Compassion is our heart. We care deeply and create a
                  supportive environment for growth. We’re dedicated to making a
                  positive impact on individuals and organizations.
                </p>
              </div>
            </div>

            {/* Right column - Excellence */}
            <div className="flex items-start gap-6">
              <img
                src={images.excellence}
                alt="excellence"
                className="w-20 h-20 object-cover rounded-sm shadow-sm flex-shrink-0"
              />
              <div>
                <h3 className="text-[#2873b8] font-semibold text-lg mb-2">
                  Excellence:
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  We’re committed to delivering the best in global executive
                  education, fostering transformative learning, and empowering
                  leaders for an ever-changing world. Excellence guides us in
                  every aspect of our work.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom full-width paragraph */}
          <div className="mt-6">
            <p className="leading-relaxed ">
              XED affirms its commitment to responsible business conduct,
              environmental stewardship, and positive societal impact. The
              organisation upholds rigorous standards of ethical governance,
              inclusion, and sustainability across all operations. XED
              integrates net-zero-aligned practices, minimises carbon intensity
              in program delivery, and advances capacity-building initiatives
              that contribute to long-term public value creation. All
              activities, partnerships, and stakeholder engagements are
              conducted in accordance with internationally recognised ESG
              principles, reflecting XED’s dedication to integrity, social
              responsibility, and sustainable development.
            </p>
          </div>
        </div>
      </section>
      <section className="">
        <div className="mx-auto p-16 ">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Image - left on desktop */}
            <div className="md:col-span-5">
              <div className="w-full overflow-hidden">
                <img
                  src={img}
                  alt="our culture"
                  className="w-full h-auto object-cover block"
                  style={{ aspectRatio: "1 / 1" }}
                />
              </div>
            </div>

            {/* Text - right */}
            <div className="md:col-span-7">
              <h2 className="text-3xl md:text-4xl font-extrabold  mb-6">
                Our Culture
              </h2>

              <p className=" leading-relaxed mb-6 max-w-3xl">
                At XED, our culture embodies our commitment to continuous
                learning and innovative thinking, driving us to excel in every
                endeavor. Our transparent and rewarding workplace has cultivated
                a resilient team of motivated, talented, and driven individuals
                who are dedicated to enhancing XED each day.
              </p>

              <p className=" leading-relaxed max-w-3xl">
                We take pride in our exceptionally diverse and inclusive
                workplace, where the well-being and growth of all individuals
                are paramount. Our culture is not just a reflection of our
                values; it’s the very foundation upon which we build a brighter
                future for XED and our global community of learners.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-16 lg:py-24">
        <h2 className="text-3xl font-bold mb-6 text-slate-900">
          Global Presence
        </h2>
        <div className="border border-#[ddd] w-full rounded-sm">
          <img
            src="https://xedinstitute.org/wp-content/uploads/2024/11/Final-XED-Website-About-Us-Global-presence-1024x504.png"
            height={"100%"}
            width={"100%"}
          />
        </div>
      </section>
    </div>
  );
};

export default page;
