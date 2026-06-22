import { View, Text } from 'react-native';
import { Card } from '@/components/ui';

interface ExpenseCardProps {
  title: string;
  amount: number;
  category: string;
  date: string;
}

export function ExpenseCard({
  title,
  amount,
  category,
  date,
}: ExpenseCardProps) {
  return (
    <Card>
      <View className="flex-row items-center justify-between">
        <View className="flex-1">
          <Text className="text-base font-semibold">{title}</Text>
          <Text className="mt-1 text-sm text-gray-500">
            {category} • {date}
          </Text>
        </View>
        <Text className="text-lg font-bold text-green-600">
          ₹{amount.toFixed(2)}
        </Text>
      </View>
    </Card>
  );
}
