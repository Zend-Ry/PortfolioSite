import { useTheme } from '../context/ThemeContext';

export function Experience() {
  const { theme, colors } = useTheme();

  const experience = [
    {
      role: "Game Developer",
      company: "Company Name / Indie",
      period: "2024 - Present",
      description: "Leading development on multiple game projects, implementing core gameplay systems and optimizing performance.",
      achievements: [
        "Developed and shipped 2 commercial games",
        "Implemented advanced AI systems and procedural generation",
        "Collaborated with artists and designers on cross-functional teams"
      ]
    },
    {
      role: "Junior Game Programmer",
      company: "Previous Company",
      period: "2022 - 2024",
      description: "Worked on gameplay features, UI systems, and bug fixes for mobile games.",
      achievements: [
        "Built reusable UI components used across 5+ projects",
        "Reduced load times by 40% through asset optimization",
        "Mentored 2 junior developers on best practices"
      ]
    }
  ];

  return (
    <section id="experience" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h3 className="text-3xl" style={{ fontFamily: 'SUSE, sans-serif' }}>
            <span style={{ color: colors.primary }}>Experience</span>
          </h3>
        </div>
        
        <div className="space-y-6">
          {experience.map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: colors.cardBg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                <div>
                  <h4 className="text-xl mb-1" style={{ color: colors.text }}>
                    {item.role}
                  </h4>
                  <p className="text-sm" style={{ color: colors.primary }}>
                    {item.company}
                  </p>
                </div>
                <span 
                  className="text-sm px-3 py-1 rounded-full mt-2 md:mt-0 w-fit"
                  style={{ backgroundColor: theme === 'light' ? '#f0f1ec' : '#31333c', color: colors.primary }}
                >
                  {item.period}
                </span>
              </div>
              <p className="text-sm mb-4 leading-relaxed" style={{ color: colors.textSecondary }}>
                {item.description}
              </p>
              
              {item.achievements && (
                <ul className="space-y-2 list-disc list-inside">
                  {item.achievements.map((achievement, achIndex) => (
                    <li 
                      key={achIndex}
                      className="text-sm"
                      style={{ color: colors.textSecondary }}
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}