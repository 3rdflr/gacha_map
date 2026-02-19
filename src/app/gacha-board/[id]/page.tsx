import GachaPostDetail from '@/components/GachaPostDetail';

export default function Page({ params }: { params: { id: string } }) {
  return <GachaPostDetail postId={params.id} />;
}
