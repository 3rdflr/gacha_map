import GachaPostEditor from '@/components/GachaPostEditor';

export default function Page({ params }: { params: { id: string } }) {
  return <GachaPostEditor postId={params.id} />;
}
