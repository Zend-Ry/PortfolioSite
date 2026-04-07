import { useTheme } from '../context/ThemeContext';

export function Experience() {
  const { theme, colors } = useTheme();

  const experience = [
    {
      role: "Receiver",
      company: "Canada Computers · Ottawa, Ontario",
      period: "2023 – Present",
    },
    {
      role: "Technology Consultant",
      company: "Staples · Huntsville, Ontario",
      period: "2018 – 2022",
    }
  ];

  const dividerColor = theme === 'light' ? '#c9cdd6' : '#404455';

  return (
    <section id="experience" className="py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="mb-8">
          <h3 className="text-3xl" style={{ fontFamily: 'SUSE, sans-serif', color: colors.text }}>
            <span style={{ color: colors.primary }}>Experience</span>
          </h3>
        </div>

        <div style={{ borderTop: `1.5px solid ${dividerColor}` }}>
          {experience.map((item, index) => (
            <div
              key={index}
              className="py-7"
              style={{ borderBottom: `1.5px solid ${dividerColor}` }}
            >
              <div className="flex items-baseline justify-between gap-4 mb-1">
                <h4 className="text-base font-semibold" style={{ color: colors.text }}>
                  {item.role}
                </h4>
                <span className="text-sm shrink-0" style={{ color: colors.textSecondary }}>
                  {item.period}
                </span>
              </div>

              <p className="text-sm" style={{ color: colors.primary }}>
                {item.company}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}