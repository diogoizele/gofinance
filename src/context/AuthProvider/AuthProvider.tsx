import axios from "axios";
import { useEffect, useState } from "react";

import * as AuthSession from "expo-auth-session";
import * as AppleAuthentication from "expo-apple-authentication";

import { AuthContext, AuthContextData, User } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KEYS } from "../../global/constants/asyncStorageKeys";

interface AuthProviderProps {
  children: React.ReactNode;
}

interface AuthorizationResponse {
  params: {
    access_token: string;
  };
  type: string;
}

const { CLIENT_ID } = process.env;
const { REDIRECT_URI } = process.env;

export function AuthProvider({ children }: AuthProviderProps) {
  const [userStorageLoading, setUserStorageLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  const value: AuthContextData = {
    user,
    isUserStorageLoading: userStorageLoading,
    signInWithGoogle,
    signInWithApple,
    signOut,
  };

  // https://developers.google.com/identity/protocols/oauth2/native-app?hl=pt-br
  async function signInWithGoogle() {
    try {
      const RESPONSE_TYPE = "token";

      //developers.google.com/identity/protocols/oauth2/scopes?hl=pt-br
      const SCOPE = encodeURI("profile email");

      const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}&scope=${SCOPE}`;

      const { params, type } = (await AuthSession.startAsync({
        authUrl,
      })) as AuthorizationResponse;

      if (type === "success") {
        const { data } = await axios.get(
          `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${params.access_token}`
        );

        const userInfo = {
          id: data.id,
          name: data.name,
          email: data.email,
          picture: data.picture,
        } as User;

        setUser(userInfo);
        await AsyncStorage.setItem(KEYS.USER, JSON.stringify(userInfo));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signInWithApple() {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });

      if (credential) {
        const userLogged = {
          id: String(credential.user),
          email: credential.email,
          name: credential.fullName?.givenName,
          picture: `https://ui-avatars.com/api/?name=${credential.fullName?.givenName}&length=1`,
        } as User;

        setUser(userLogged);
        await AsyncStorage.setItem(KEYS.USER, JSON.stringify(userLogged));
      }
    } catch (error: any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    setUser({} as User);

    await AsyncStorage.removeItem(KEYS.USER);
  }

  async function loadUserStorageData() {
    const userStorage = await AsyncStorage.getItem(KEYS.USER);

    if (userStorage) {
      const userLogged = JSON.parse(userStorage) as User;
      setUser(userLogged);
    }
    setUserStorageLoading(false);
  }

  useEffect(() => {
    loadUserStorageData();
  }, []);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
