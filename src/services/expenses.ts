import { api } from '@/lib/api';
import type {
  ApiResponse,
  PersonalExpense,
  PersonalExpenseCreate,
  PersonalExpenseUpdate,
} from '@/types';

export async function getPersonalExpenses(): Promise<PersonalExpense[]> {
  const response = await api.get<ApiResponse<PersonalExpense[]>>('/expenses/');
  return response.data.data;
}

export async function getPersonalExpense(
  expense_id: string,
): Promise<PersonalExpense> {
  const response = await api.get<ApiResponse<PersonalExpense>>(
    `/expenses/${expense_id}`,
  );
  return response.data.data;
}

export async function createPersonalExpense(
  expense: PersonalExpenseCreate,
): Promise<PersonalExpense> {
  const response = await api.post<ApiResponse<PersonalExpense>>(
    '/expenses/',
    expense,
  );
  return response.data.data;
}

export async function updatePersonalExpense(
  expense_id: string,
  expense: PersonalExpenseUpdate,
): Promise<PersonalExpense> {
  const response = await api.put<ApiResponse<PersonalExpense>>(
    `/expenses/${expense_id}`,
    expense,
  );
  return response.data.data;
}

export async function deletePersonalExpense(expense_id: string): Promise<void> {
  await api.delete(`/expenses/${expense_id}`);
}
