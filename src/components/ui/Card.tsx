import { ReactNode } from 'react';
import { View } from 'react-native';

interface CardProps {
  children: ReactNode;
}

export function Card({ children }: CardProps) {
  return (
    <View className="rounded-2xl border border-slate-200 bg-white p-5">
      {children}
    </View>
  );
}
