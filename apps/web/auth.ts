import NextAuth from "next-auth";
import Keycloak from "next-auth/providers/keycloak";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [Keycloak],
  callbacks: {
    jwt({ token, user, profile }) {
      // When user signs in, add the ID to the token
      if (user) {
        token.id = user.id;
      }
      // For Keycloak, the user ID might be in the profile.sub
      if (profile?.sub) {
        token.id = profile.sub;
      }
      return token;
    },
    session({ session, token }) {
      // Pass the user ID from token to session
      if (token && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  trustHost: true,
});
