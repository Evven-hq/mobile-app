import { createGroup, getGroups } from '@/services/groups';
import { Group } from '@/types';
import { FontAwesome5, FontAwesome6, Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Modal, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const GROUP_COLORS = [
  { bg: '#EEEDFE', text: '#534AB7' },
  { bg: '#E1F5EE', text: '#0F6E56' },
  { bg: '#FAECE7', text: '#993C1D' },
  { bg: '#FBEAF0', text: '#993556' },
  { bg: '#E6F1FB', text: '#185FA5' },
  { bg: '#FEF9E7', text: '#8A6C0A' },
];

function formatDate(d: string) {
  return new Date(d).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function GroupScreen() {

  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [creating, setCreating] = useState(false);
  const [createError, setCreateError] = useState('');

  useEffect(() =>{
    getGroups().then(setGroups).catch(() => setError("Failed to load groups.")).finally(() => setLoading(false));
  }, []);

  async function handleCreate() {
    if(!newName.trim()) return;
    setCreating(true);
    setCreateError("");
    try {
      const group = await createGroup(newName.trim());
      setGroups((prev) => [group, ...prev]);
      setShowCreate(false);
      setNewName("");
      router.push(`/(app)/groups/${group.id})`);
    }
    catch{
      setError("Could not create group. Try again.");
    }
    finally{
      setCreating(false);
    }
  }

  return (
    <View className="flex-1 bg-slate-50">
      <ScrollView
        contentContainerStyle={{
          padding: 16,
          paddingTop: 32,
        }}
      >
        <View className="flex-row items-center justify-between mb-6">
          <View>
            <Text className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">
              Your spaces
            </Text>

            <Text className="text-3xl font-semibold text-slate-900">
              Groups
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => setShowCreate(true)}
            className="flex-row items-center gap-2 bg-emerald-700 px-4 py-2 rounded-xl"
          >
            <FontAwesome6 name="plus" size={15} color="white" />
            <Text className="text-white font-medium">New group</Text>
          </TouchableOpacity>
        </View>

        {loading && (
          <View className="gap-3">
            {[1, 2, 3].map((i) => (
              <View key={i} className="h-16 rounded-2xl bg-slate-200" />
            ))}
          </View>
        )}

        {error && !loading && (
          <View className="bg-red-50 rounded-xl p-4">
            <Text className="text-red-700 text-sm">{error}</Text>
          </View>
        )}

        {!loading && !error && groups.length === 0 && (
          <View className="bg-white border border-slate-200 rounded-3xl p-10 items-center">
            <View className="w-14 h-14 rounded-2xl bg-emerald-100 items-center justify-center mb-4">
              <FontAwesome5 name="users" size={24} color="#047857" />
            </View>

            <Text className="text-slate-900 font-semibold mb-1">
              No groups yet
            </Text>

            <Text className="text-slate-500 text-center mb-5">
              Create a group to start splitting expenses with people you share
              costs with.
            </Text>

            <TouchableOpacity
              onPress={() => setShowCreate(true)}
              className="bg-emerald-700 px-5 py-3 rounded-xl flex-row items-center"
            >
              <FontAwesome6 name="plus" size={15} color="white" />
              <Text className="text-white ml-2 font-medium">
                Create your first group
              </Text>
            </TouchableOpacity>
          </View>
        )}
        {!loading && groups.length > 0 && (
          <View className="gap-2">
            {groups.map((g, i) => {
              const color = GROUP_COLORS[i % GROUP_COLORS.length];

              return (
                <Link key={g.id} href={`/groups/${g.id}`} asChild>
                  <TouchableOpacity className="flex-row items-center bg-white border border-slate-200 rounded-2xl px-4 py-4">
                    <View
                      className="w-10 h-10 rounded-full items-center justify-center mr-4"
                      style={{
                        backgroundColor: color.bg,
                      }}
                    >
                      <Text
                        style={{
                          color: color.text,
                        }}
                        className="font-semibold"
                      >
                        {getInitials(g.name)}
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-sm font-medium text-slate-900">
                        {g.name}
                      </Text>

                      <Text className="text-xs text-slate-500 mt-1">
                        Created {formatDate(g.created_at)}
                      </Text>
                    </View>

                    <FontAwesome5
                      name="chevron-right"
                      size={16}
                      color="#94A3B8"
                    />
                  </TouchableOpacity>
                </Link>
              );
            })}
          </View>
        )}
        <Modal visible={showCreate} transparent animationType="fade">
          <View className="flex-1 justify-center items-center bg-black/30 px-4">
            <View className="w-full max-w-sm bg-white rounded-3xl p-6">
              <TouchableOpacity
                onPress={() => setShowCreate(false)}
                className="absolute top-4 right-4 bg-slate-100 p-2 rounded-lg"
              >
                <Ionicons name="close-circle-outline" size={15} color="black" />
              </TouchableOpacity>

              <Text className="text-base font-semibold text-slate-900 mb-1">
                New group
              </Text>

              <Text className="text-sm text-slate-500 mb-5">
                Give your group a name — trip, flat, team, whatever fits.
              </Text>

              <TextInput
                value={newName}
                onChangeText={setNewName}
                placeholder="e.g. Goa Trip 2025"
                className="border border-slate-200 bg-slate-50 rounded-xl px-4 py-3 mb-3"
              />

              {createError && (
                <Text className="text-red-600 text-xs mb-3">{createError}</Text>
              )}

              <TouchableOpacity
                onPress={handleCreate}
                disabled={!newName.trim() || creating}
                className="bg-emerald-700 rounded-xl py-3 items-center justify-center flex-row"
              >
                {creating ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <>
                    <FontAwesome6 name="plus" size={15} color="white" />
                    <Text className="text-white font-medium ml-2">
                      Create group
                    </Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
}
