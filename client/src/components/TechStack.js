import React from 'react';
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNodedotjs,
  SiMongodb,
  SiExpress,
  SiPython,
  SiDjango,
  SiPostgresql,
  SiMysql,
  SiDocker,
  SiKubernetes,
  SiAmazonaws,
  SiGit,
  SiRedis,
  SiGraphql,
  SiTailwindcss,
  SiBootstrap,
  SiFigma,
  SiHtml5,
  SiMongoose,
  SiMicrosoftazure,
  SiFlask,
} from 'react-icons/si';

const TechStack = () => {
  const techStacks = [
    {
      category: 'Frontend',
      skills: [
        { icon: <SiHtml5 />, name: 'HTML5', color: '#E34F26' },
        { icon: <SiReact />, name: 'React', color: '#61DAFB' },
        { icon: <SiJavascript />, name: 'JavaScript', color: '#F7DF1E' },
        { icon: <SiTypescript />, name: 'TypeScript', color: '#3178C6' },
        { icon: <SiTailwindcss />, name: 'Tailwind CSS', color: '#06B6D4' },
        { icon: <SiBootstrap />, name: 'Bootstrap', color: '#7952B3' },
      ],
    },
    {
      category: 'Backend',
      skills: [
        { icon: <SiNodedotjs />, name: 'Node.js', color: '#339933' },
        { icon: <SiExpress />, name: 'Express', color: '#FFFFFF' },
        { icon: <SiPython />, name: 'Python', color: '#3776AB' },
        { icon: <SiDjango />, name: 'Django', color: '#092E20' },
        { icon: <SiFlask />, name: 'Flask', color: '#FFFFFF' },
        { icon: <SiGraphql />, name: 'GraphQL', color: '#E10098' },
      ],
    },
    {
      category: 'Database',
      skills: [
        { icon: <SiMongodb />, name: 'MongoDB', color: '#47A248' },
        { icon: <SiMongoose />, name: 'Mongoose', color: '#880000' },
        { icon: <SiPostgresql />, name: 'PostgreSQL', color: '#4169E1' },
        { icon: <SiMysql />, name: 'MySQL', color: '#4479A1' },
        { icon: <SiRedis />, name: 'Redis', color: '#DC382D' },
        { icon: <SiMicrosoftazure />, name: 'Azure', color: '#0078D4' },
      ],
    },
    {
      category: 'Tools & Cloud',
      skills: [
        { icon: <SiGit />, name: 'Git', color: '#F05032' },
        { icon: <SiDocker />, name: 'Docker', color: '#2496ED' },
        { icon: <SiKubernetes />, name: 'Kubernetes', color: '#326CE5' },
        { icon: <SiAmazonaws />, name: 'AWS', color: '#FF9900' },
        { icon: <SiFigma />, name: 'Figma', color: '#F24E1E' },
      ],
    },
  ];

  return (
    <div className="py-16">
      <h2 className="text-4xl font-bold text-center mb-12">
        <span className="gradient-text">Tech Stack</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {techStacks.map((stack, idx) => (
          <div
            key={idx}
            className="bg-darker/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:border-primary/50 transition-all"
          >
            <h3 className="text-xl font-bold text-primary mb-6 text-center">
              {stack.category}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              {stack.skills.map((skill, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center group p-3 rounded-lg bg-dark/30 hover:bg-dark/50 transition-all hover:scale-110"
                  title={skill.name}
                >
                  <div
                    className="text-4xl tech-icon mb-2 drop-shadow-lg"
                    style={{ 
                      color: skill.color,
                      filter: 'drop-shadow(0 0 8px rgba(199, 112, 240, 0.3))'
                    }}
                  >
                    {skill.icon}
                  </div>
                  <span className="text-xs text-gray-300 font-medium text-center">
                    {skill.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack;
