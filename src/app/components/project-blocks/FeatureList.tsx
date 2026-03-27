import { Check } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

interface FeatureListProps {
  title?: string;
  features: string[];
}

export function FeatureList({ title, features }: FeatureListProps) {
  const { colors } = useTheme();
  
  return (
    <div className="mb-12">
      {title && (
        <h3 className="text-2xl mb-6">
          <span style={{ color: colors.primary }}>{title}</span>
        </h3>
      )}
      <ul className="space-y-3">
        {features.map((feature, index) => (
          <li 
            key={index} 
            className="flex items-start gap-3"
          >
            <Check size={20} style={{ color: colors.primary, marginTop: '2px', flexShrink: 0 }} />
            <span style={{ color: colors.textSecondary }}>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}