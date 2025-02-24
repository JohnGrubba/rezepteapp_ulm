import { auth } from "@/auth";

export default async function Home() {
  const session = await auth()
  return (
    <div>
      <p className='md:text-2xl text-xl font-bold'>Welcome back {session?.user?.name || 'to Rezeptify'}!</p>
    </div>
  );
}
