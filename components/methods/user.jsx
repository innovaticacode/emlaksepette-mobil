import { View, Text } from "react-native";
import React from "react";
import * as SecureStore from "expo-secure-store";

export default async function userData() {
  let result = await SecureStore.getItemAsync("user");
  return JSON.parse(result);
}

export async function getValueFor(key, setState) {
  let result = await SecureStore.getItemAsync(key);
  
  if (result) {
    setState(JSON.parse(result));
  }
}

export async function getValueFor2(key, setState) {
  let result = await SecureStore.getItemAsync(key);
  
  if (result) {
    setState(result);
  }
}
