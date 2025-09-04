import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function Profile() {
  const [profile, setProfile] = useState({ name: "", phone: "", addresses: [] });
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      let { data } = await supabase.from("profiles").select("*").eq("id", user.id).single();
      if (data) setProfile(data);
    }
    loadProfile();
  }, []);

  const saveProfile = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    await supabase.from("profiles").upsert({ id: user.id, ...profile });
    alert("Profile saved!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl">👤 Profile</h1>
      <input
        className="block p-2 mt-2 text-black"
        placeholder="Name"
        value={profile.name}
        onChange={(e) => setProfile({ ...profile, name: e.target.value })}
      />
      <input
        className="block p-2 mt-2 text-black"
        placeholder="Phone"
        value={profile.phone}
        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
      />
      <textarea
        className="block p-2 mt-2 text-black"
        placeholder="Add Address"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <button
        className="mt-2 px-4 py-2 bg-brandGold text-black"
        onClick={() => {
          setProfile({ ...profile, addresses: [...profile.addresses, address] });
          setAddress("");
        }}
      >
        Add Address
      </button>
      <button
        className="mt-2 ml-2 px-4 py-2 bg-brandGold text-black"
        onClick={saveProfile}
      >
        Save
      </button>
    </div>
  );
}
