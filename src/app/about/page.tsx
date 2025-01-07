import { latoSans } from "@/utils/fonts";
import React from "react";

function About() {
  return (
    <div>
      <h2 className={`${latoSans.className} font-bold text-[34px]`}>
        About Aimee
      </h2>
      <p className="pt-4">
        As a self-taught web developer, I&apos;m committed to expanding my
        knowledge and exploring new technologies. My passion for coding is
        evident in how I spend most of my free time exploring new technologies
        and honing my skills. I seek out challenges and opportunities to push
        myself beyond limits, and I thrive on developing innovative solutions.
      </p>

      <p className="pt-4">
        With skills in React, TypeScript, HTML, CSS, JavaScript, and AWS
        Amplify, I am well-equipped to tackle complex coding challenges and
        deliver high-quality front-end solutions. Whether it&apos;s developing a
        web application, a mobile app, or a responsive website, I approach each
        project with confidence and creativity, leveraging my skills to create
        visually appealing user interfaces. Over the years, I&apos;ve gained
        hands-on experience and adapted to emerging technologies to refine my
        skills continually. My commitment to producing top-notch work is evident
        in every project I undertake.
      </p>

      <p>
        My Hobbies, include travelling, photography, painting, cyling, live
        gigs, swimming, video games.
      </p>
    </div>
  );
}

export default About;
