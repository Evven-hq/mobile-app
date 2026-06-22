import { Text, View } from 'react-native';
import { Card } from '@/components/ui';

interface GroupCardProps {
  name: string;
  members: number;
  totalExpense: number;
}

export function GroupCard({ name, members, totalExpense }: GroupCardProps) {
  return (
    <Card>
      <View className="gap-2">
        <Text className="text-lg font-semibold">{name}</Text>

        <Text className="text-sm text-gray-500">{members} Members</Text>

        <Text className="text-base font-medium text-blue-600">
          ₹{totalExpense.toFixed(2)}
        </Text>
      </View>
    </Card>
  );
}
