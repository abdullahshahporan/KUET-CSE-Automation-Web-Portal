import React from 'react';

interface SpotlightCardProps extends React.PropsWithChildren {
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({
  children,
  className = '',
}) => {
  return (
    <div className={`rounded-lg border border-gray-200 bg-white p-6 ${className}`}>
      {children}
    </div>
  );
};

export default SpotlightCard;
