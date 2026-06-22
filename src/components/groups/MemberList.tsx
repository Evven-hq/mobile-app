import { FlatList, View, Text } from 'react-native';

interface Member {
  id: string;
  name: string;
  userCode: string;
}

interface MemberListProps {
  members: Member[];
}

export function MemberList({ members }: MemberListProps) {
  return (
    <FlatList
      data={members}
      keyExtractor={(item) => item.id}
      scrollEnabled={false}
      renderItem={({ item }) => (
        <View className="flex-row items-center justify-between border-b border-gray-200 py-3">
          <View>
            <Text className="text-base font-medium">{item.name}</Text>

            <Text className="text-sm text-gray-500">{item.userCode}</Text>
          </View>
        </View>
      )}
    />
  );
}
