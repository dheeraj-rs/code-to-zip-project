import { BuilderHeader } from '@/components/builder/builder-header';
import { BuilderInterface } from '@/components/builder/builder-interface';

export default function Home() {
  return (
    <main className="flex flex-col h-screen bg-background">
      <BuilderHeader />
      <BuilderInterface />
    </main>
  );
}