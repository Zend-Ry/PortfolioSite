import { useTheme } from '../context/ThemeContext';

export function Education() {
  const { theme, colors } = useTheme();

  const education = [
    {
      degree: "Bachelor of Science in Computer Science",
      school: "University Name",
      year: "2020 - 2024",
      description: "Focused on game development, graphics programming, and software engineering."
    },
    {
      degree: "Game Development Certificate",
      school: "Online Platform / Institution",
      year: "2023",
      description: "Specialized training in Unity and C# for game development."
    }
  ];

  return (
    <section id="education" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h3 className="text-3xl" style={{ fontFamily: 'SUSE, sans-serif', color: colors.text }}>
            Education & <span style={{ color: colors.primary }}>Certificates</span>
          </h3>
        </div>
        
        <div className="space-y-6">
          {education.map((item, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg transition-all hover:shadow-lg"
              style={{ 
                backgroundColor: colors.cardBg,
                borderLeft: `4px solid ${colors.primary}`,
                boxShadow: theme === 'light' ? '0 2px 10px rgba(0,0,0,0.05)' : 'none'
              }}
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-xl" style={{ color: colors.text }}>
                  {item.degree}
                </h4>
                <span 
                  className="text-sm px-3 py-1 rounded-full"
                  style={{ backgroundColor: theme === 'light' ? '#f0f1ec' : '#31333c', color: colors.primary }}
                >
                  {item.year}
                </span>
              </div>
              <p className="text-sm mb-2" style={{ color: colors.primary }}>
                {item.school}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}