import { Stack } from "expo-router";
import * as React from "react";
import { ScrollView, View } from "react-native";
import { Appbar, Avatar, Card, Searchbar, Text } from "react-native-paper";

import userData from "./data.json";

type User = {
  name: string;
  email: string;
  photo_url?: string;
};

export default function App() {
  const [query, setQuery] = React.useState("");

  const filtered = (userData as User[]).filter((u) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q);
  });

  return (
    <>
      <Stack.Screen options={{ title: "User List" }} />

      {/* Paper Header */}
      <Appbar.Header>
        <Appbar.Content title="User List" subtitle={`${filtered.length} users`} />
      </Appbar.Header>

      {/* Search */}
      <View style={{ padding: 12 }}>
        <Searchbar
          placeholder="Search name or email"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Paper Cards */}
      <ScrollView contentContainerStyle={{ padding: 12 }}>
        {filtered.map((u, index) => (
          <Card key={index} mode="elevated" style={{ marginBottom: 12 }}>
            <Card.Title
              title={u.name}
              subtitle={u.email}
              left={() =>
                u.photo_url ? (
                  <Avatar.Image size={44} source={{ uri: u.photo_url }} />
                ) : (
                  <Avatar.Text size={44} label={(u.name?.[0] ?? "U").toUpperCase()} />
                )
              }
            />
            <Card.Content>
              <Text variant="bodySmall" style={{ opacity: 0.7 }}>
                Profile loaded from JSON
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
    </>
  );
}