import { TextInput, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {}

export function Input(props: InputProps) {
  return (
    <TextInput
      {...props}
      placeholderTextColor={'94A3B8'}
      className="h-12 rounded-xl border border-slate-200 bg-white px-4 text-base text-slate-900"
    />
  );
}
