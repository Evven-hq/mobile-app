import { useState } from 'react';
import { View, Text } from 'react-native';
import { Button, Card, Input } from '@/components/ui';
interface ExpenseFormValues {
  title: string;
  amount: number;
  category: string;
  description?: string;
}

interface ExpenseFormProps {
  submitLabel: string;
  loading?: boolean;
  onSubmit: (values: ExpenseFormValues) => void;
}

export function ExpenseForm({
  submitLabel,
  loading = false,
  onSubmit,
}: ExpenseFormProps) {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  function handleSubmit() {
    if (!title.trim()) return;
    if (!amount.trim()) return;
    if (!category.trim()) return;

    onSubmit({
      title: title.trim(),
      amount: Number(amount),
      category: category.trim(),
      description: description.trim(),
    });
  }

  return (
    <Card>
      <View className="gap-4">
        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Title</Text>
          <Input value={title} onChangeText={setTitle} placeholder="Dinner" />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">Amount</Text>
          <Input
            value={amount}
            onChangeText={setAmount}
            placeholder="500"
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">
            Category
          </Text>
          <Input
            value={category}
            onChangeText={setCategory}
            placeholder="Food"
          />
        </View>

        <View>
          <Text className="mb-2 text-sm font-medium text-gray-700">
            Description
          </Text>
          <Input
            value={description}
            onChangeText={setDescription}
            placeholder="Optional"
            multiline
          />
        </View>

        <Button title={submitLabel} OnPress={handleSubmit} loading={loading} />
      </View>
    </Card>
  );
}
