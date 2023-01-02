import React from "react";
import { Button } from "@rneui/themed";
import { supabase } from "../lib/initSupabase";

export default function SignoutButton() {

    return (
        <Button
          title={"Sign out"}
          buttonStyle={{
            backgroundColor: "rgba(25,25,25, .7)",
            borderRadius: 20,
          }}
          containerStyle={{
            width: 100,
            marginVertical: 10,
          }}
          size="sm"
          titleStyle={{ color: "white" }}
          onPress={() => supabase.auth.signOut()}
        />
    )
}