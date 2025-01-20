import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <p className='text-2xl font-bold'>Welcome back {session?.user?.name || 'there'}!</p>

    </div>
  );
}
