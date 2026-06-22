import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

interface ButtonProps {
  title: string;
  OnPress: () => void;
  loading?: boolean;
  disabled?: boolean;
}

export function Button({
  title,
  OnPress,
  loading = false,
  disabled = false,
}: ButtonProps) {
  return (
    <TouchableOpacity
      onPress={OnPress}
      activeOpacity={0.8}
      disabled={disabled || loading}
      className="h-12 items-center justify-center rounded-xl bg-blue-600"
    >
      {loading ? (
        <ActivityIndicator color="white" />
      ) : (
        <Text className="text-base font-semibold text-white">{title}</Text>
      )}
    </TouchableOpacity>
  );
}
