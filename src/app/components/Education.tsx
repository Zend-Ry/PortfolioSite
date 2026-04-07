import { useTheme } from '../context/ThemeContext';

export function Education() {
  const { theme, colors } = useTheme();

  const education = [
    {
      degree: "Game Development — Advanced Diploma",
      school: "Algonquin College · Ottawa, Ontario",
      year: "2025",
      achievements: [
        "Developed 3D games in a studio-simulated environment",
        "Gained expertise in gameplay programming, digital imaging, and asset creation",
        "Led a team to conceptualize, design, and develop a fully playable game",
        "Trained in C++, C#, Unreal, and Unity with a focus on teamwork, communication, and time management",
      ]
    }
  ];

  const dividerColor = theme === 'light' ? '#c9cdd6' : '#404455';

  return (
    <section id="education" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h3 className="text-3xl" style={{ fontFamily: 'SUSE, sans-serif', color: colors.text }}>
            Education & <span style={{ color: colors.primary }}>Certificates</span>
          </h3>
        </div>

        <div style={{ borderTop: `1.5px solid ${dividerColor}` }}>
          {education.map((item, index) => (
            <div
              key={index}
              className="py-7"
              style={{ borderBottom: `1.5px solid ${dividerColor}` }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h4 className="text-base font-semibold" style={{ color: colors.text }}>
                  {item.degree}
                </h4>
                <span className="text-sm shrink-0" style={{ color: colors.textSecondary }}>
                  {item.year}
                </span>
              </div>

              <p className="text-sm mb-3" style={{ color: colors.primary }}>
                {item.school}
              </p>

              <ul className="space-y-1">
                {item.achievements.map((point, i) => (
                  <li key={i} className="text-sm flex gap-2" style={{ color: colors.textSecondary }}>
                    <span style={{ color: colors.primary }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}